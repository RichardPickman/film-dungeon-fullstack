import { drizzle } from 'drizzle-orm/postgres-js';
import { configs } from '../config';
import * as schema from './schemas/game';
import postgres from 'postgres';

const { DATABASE_URL } = configs;

if (!DATABASE_URL) {
    throw new Error('NO DATABASE URL!');
}

const client = postgres(DATABASE_URL);

export const db = drizzle(client, { schema });
