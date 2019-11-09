import { cleanEnv, num, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num(),
  DB: str(),
});
