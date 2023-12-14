import * as path from 'path';

const date = new Date().toDateString();

interface EmailOptions {
  subject: string;
  from: string;
  to: string;
  wait_time_sec: number;
  max_wait_time_sec: number;
  include_body: boolean;
  after?: Date;
}

interface Config {
  credentialsPath: string;
  tokenPath: string;
  options: EmailOptions;
}

const config: Config = {
  credentialsPath: path.resolve('authentication/credentials.json'),
  tokenPath: path.resolve('authentication/token.json'),
  options: {
    subject: 'Your Magic Link',
    from: 'magic.testbox@gmail.com',
    to: 'magic.testbox@gmail.com',
    wait_time_sec: 30,
    max_wait_time_sec: 60,
    include_body: true,
    //after: new Date(date),
  },
};

export default config;
