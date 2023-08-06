import { relations } from 'drizzle-orm';
import { integer, json, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const game = pgTable('game', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
});

export const dungeon = pgTable('dungeon', {
    id: serial('id').primaryKey(),
    image: json('image'),
    name: varchar('name', { length: 256 }),
    gameId: integer('game_id')
        .notNull()
        .references(() => game.id, { onDelete: 'cascade' }),
    bossId: integer('boss_id').references(() => monster.id, { onDelete: 'set null' }),
});

export const monster = pgTable('monster', {
    id: serial('id').primaryKey(),
    hp: integer('hp'),
    name: varchar('name', { length: 256 }),
    image: json('image'),
    dungeonId: integer('dungeon_id'),
});

export const question = pgTable('question', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 64 }),
    question: varchar('question', { length: 256 }),
    image: json('image'),
    answers: json('answers'),
    letters: json('letters'),
    numbers: json('numbers'),
    monsterId: integer('monster_id').notNull(),
});

export const gameRelations = relations(game, ({ many }) => ({
    dungeons: many(dungeon),
}));

export const dungeonRelations = relations(dungeon, ({ many, one }) => ({
    monsters: many(monster),
    gameId: one(game, { fields: [dungeon.gameId], references: [game.id] }),
    boss: one(monster, { fields: [dungeon.bossId], references: [monster.id] }),
}));

export const monsterRelations = relations(monster, ({ many, one }) => ({
    questions: many(question),
    dungeonId: one(dungeon, { fields: [monster.dungeonId], references: [dungeon.id] }),
}));

export const questionRelations = relations(question, ({ one }) => ({
    monster: one(monster, { fields: [question.monsterId], references: [monster.id] }),
}));
