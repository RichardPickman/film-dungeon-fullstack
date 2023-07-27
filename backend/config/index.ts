import dotenv from 'dotenv';

dotenv.config();

export const configs = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.SERVER_PORT,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_USER: process.env.POSTGRES_USER,
}
