import { USER_EMAIL } from './env.config';
import * as path from 'path';

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
  credentialsPath: path.resolve('credentials.json'),
  tokenPath: path.resolve('token.json'),
  options: {
    subject: 'Your Magic Link',
    from: USER_EMAIL,
    to: USER_EMAIL,
    wait_time_sec: 30,
    max_wait_time_sec: 60,
    include_body: true,
  },
};

export default config;
