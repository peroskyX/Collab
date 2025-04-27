import dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, defaultValue: string = '') => {
  const value = process.env[key];
  if (key === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Enviroment variable ${key} is not set`);
  }
  return value;
};
