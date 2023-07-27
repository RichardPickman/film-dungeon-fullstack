import { relations } from 'drizzle-orm';
import { integer, json, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const game = pgTable('game', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
});

export const gameRelations = relations(game, ({ many }) => ({
    dungeons: many(dungeon),
}));

export const dungeon = pgTable('dungeon', {
    id: serial('id').primaryKey(),
    image: varchar('image', { length: 256 }),
});

export const dungeonRelations = relations(dungeon, ({ many, one }) => ({
    monsters: many(monster),
    boss: one(monster),
}));

export const monster = pgTable('monster', {
    id: serial('id').primaryKey(),
    hp: integer('hp'),
    name: varchar('name', { length: 256 }),
    image: varchar('image', { length: 256 }),
});

export const monsterRelations = relations(monster, ({ many }) => ({
    questions: many(question),
}));

export const question = pgTable('question', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 64 }),
    question: varchar('question', { length: 256 }),
    image: varchar('image', { length: 256 }),
    answers: json('answers'),
    letters: json('letters'),
    numbers: json('numbers'),
});
