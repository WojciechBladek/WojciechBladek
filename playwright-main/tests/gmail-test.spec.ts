import config from '@_config/email-config';
import { expect, test } from '@_playwright-main/fixtures/merge.fixture';
import { get_messages, refresh_access_token } from 'gmail-tester';

const extractUrlFromATag = (input: string): string => {
  const pattern = /<a href="(.*?)"/;
  const match = input.match(pattern);
  return match ? match[1] : '';
};

test('has email with magic link', async () => {
  const exceptedMessage = 'https://magic-link/delivered';

  refresh_access_token(config.credentialsPath, config.tokenPath);

  const emailTest = get_messages(
    config.credentialsPath,
    config.tokenPath,
    config.options,
  );
  await emailTest.then((emails) => {
    const body = emails[0].body.html;
    const emailMessage = extractUrlFromATag(body);

    expect(emailMessage).toContain(exceptedMessage);
  });
});
