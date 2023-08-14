import { boolean, integer, json, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const session = pgTable('session', {
    id: serial('id').primaryKey(),
    sessionId: varchar('sessionId').notNull(),
    game: json('game'),
    dungeon: json('dungeon'),
    monster: json('monster'),
    question: json('question'),
    isDungeon: boolean('isDungeon'),
    isMonster: boolean('isMonster'),
    isQuestion: boolean('isQuestion'),
    monsterHealth: integer('monsterHealth'),
    gameHealth: integer('gameHealth'),
    isImageShowing: boolean('isImageShowing'),
    isPaused: boolean('isPaused'),
});
