/* eslint-disable */
import fs from 'fs';
import Imap from 'imap';
import { simpleParser } from 'mailparser';

interface EnvData {
  admin: {
    email: string;
    password: string;
  };
  user: {
    email: string;
    password: string;
  };
  basicToken: string;
}

const rawData = fs.readFileSync('./playwright.env.json');
export const envData: EnvData = JSON.parse(rawData.toString());

// Configuring an IMAP connection
export const imapConfigAdmin: Imap.Config = {
  user: envData.admin.email,
  password: envData.admin.password,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

export const imapConfigUser: Imap.Config = {
  user: envData.user.email,
  password: envData.user.password,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

function handleError(err: Error): void {
  console.error('An error occurred:', err);
  process.exit(1);
}

// Function to process incoming messages
function processIncomingMessage(message: Imap.ImapMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    simpleParser(message, (err, parsed) => {
      if (err) {
        console.error('An error occurred while parsing the message:', err);
        reject(err);
        return;
      }

      const extractUrlFromATag = async (input: string): Promise<string> => {
        const pattern = /<a href="(.*?)"/;
        const match = input.match(pattern);
        return match ? match[1] : '';
      };

      const data: any = parsed.html;
      const result = extractUrlFromATag(data);
      resolve(result);
    });
  });
}

// Function to listen for new messages
export function listenForNewMessages(config: Imap.Config): Promise<string> {
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          handleError(err);
          reject(err);
          return;
        }

        imap.on('mail', (numNewMsgs) => {
          console.log(`New messages: ${numNewMsgs}`);

          const fetch = imap.seq.fetch(
            `${box.messages.total - numNewMsgs + 1}:${box.messages.total}`,
            { bodies: '' },
          );

          fetch.on('message', (msg, seqno) => {
            msg.on('body', (stream) => {
              processIncomingMessage(stream)
                .then((result) => {
                  resolve(result);
                })
                .catch((err) => {
                  handleError(err);
                  reject(err);
                });
            });
          });

          fetch.once('error', (fetchErr) => {
            handleError(fetchErr);
            reject(fetchErr);
          });

          fetch.once('end', () => {
            console.log('Message processing completed..');
          });
        });
      });
    });

    imap.once('error', (err) => {
      handleError(err);
      reject(err);
    });

    imap.once('end', () => {
      console.log('IMAP connection has been terminated.');
    });

    imap.connect();
  });
}

// Start listening for new messages

// listenForNewMessages(config)
//   .then((result) => {
//     result;
//     // Here you can use the 'result' value for further work
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err);
//   });
