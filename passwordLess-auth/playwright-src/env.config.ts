import * as dotenv from 'dotenv';

dotenv.config({ override: true });

function requireEnvVariable(envVariable: string): string {
  const envVariableValue = process.env[envVariable];
  if (envVariableValue === undefined) {
    throw new Error(`Environment variable  ${envVariable} is not set.`);
  }
  return envVariableValue;
}

export const BASE_URL = requireEnvVariable('BASE_URL');
export const USER_EMAIL = requireEnvVariable('USER_EMAIL');
export const USER_PASSWORD = requireEnvVariable('USER_PASSWORD');
export const ADMIN_EMAIL = requireEnvVariable('ADMIN_EMAIL');
export const ADMIN_PASSWORD = requireEnvVariable('ADMIN_PASSWORD');
export const ENV_TOKEN = requireEnvVariable('ENV_TOKEN');
