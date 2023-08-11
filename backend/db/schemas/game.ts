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
    image: json('image'),
    name: varchar('name', { length: 256 }),
    gameId: integer('game_id')
        .notNull()
        .references(() => game.id, { onDelete: 'cascade' }),
});

export const dungeonRelations = relations(dungeon, ({ many, one }) => ({
    monsters: many(monster),
    gameId: one(game, { fields: [dungeon.gameId], references: [game.id] }),
    boss: one(boss, { fields: [dungeon.id], references: [boss.dungeonId] }),
}));

export const monster = pgTable('monster', {
    id: serial('id').primaryKey(),
    hp: integer('hp'),
    name: varchar('name', { length: 256 }),
    image: json('image'),
    dungeonId: integer('dungeon_id').references(() => dungeon.id, { onDelete: 'cascade' }),
});

export const boss = pgTable('boss', {
    id: serial('id').primaryKey(),
    hp: integer('hp'),
    name: varchar('name', { length: 256 }),
    image: json('image'),
    dungeonId: integer('dungeon_id')
        .notNull()
        .references(() => dungeon.id, { onDelete: 'cascade' }),
});

export const bossRelations = relations(boss, ({ many, one }) => ({
    questions: many(question),
    dungeonId: one(dungeon, { fields: [boss.dungeonId], references: [dungeon.id] }),
}));

export const monsterRelations = relations(monster, ({ many, one }) => ({
    questions: many(question),
    dungeonId: one(dungeon, { fields: [monster.dungeonId], references: [dungeon.id] }),
}));

export const question = pgTable('question', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 64 }),
    question: varchar('question', { length: 256 }),
    image: json('image'),
    answers: json('answers'),
    letters: json('letters'),
    numbers: json('numbers'),
    monsterId: integer('monster_id').references(() => monster.id, { onDelete: 'set null' }),
    bossId: integer('boss_id').references(() => boss.id, { onDelete: 'set null' }),
});

export const questionRelations = relations(question, ({ one }) => ({
    monster: one(monster, { fields: [question.monsterId], references: [monster.id] }),
    boss: one(boss, { fields: [question.bossId], references: [boss.id] }),
}));
