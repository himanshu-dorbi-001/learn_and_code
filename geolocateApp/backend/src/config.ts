import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  googleApiKey: string;
}

export class Config {
  static load(): AppConfig {
    const googleApiKey = process.env.GOOGLE_API_KEY?.trim() ?? '';

    if (!googleApiKey) {
      throw new Error('Missing GOOGLE_API_KEY in .env configuration.');
    }

    return {
      googleApiKey,
    };
  }
}
