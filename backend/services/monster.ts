import { InferModel, eq } from 'drizzle-orm';
import { db } from '../db';
import { monster } from '../db/schemas/game';

type Monster = InferModel<typeof monster>;

export const getMonsters = async (dungeonId: number) => {
    const monsters = await db.query.monster.findMany({
        where: eq(monster.dungeonId, dungeonId),
        with: {
            questions: true,
        },
    });

    return monsters;
};

export const getMonster = async (id: number) => {
    const currentMonster = await db.query.monster.findFirst({
        where: eq(monster.id, id),
        with: {
            questions: true,
        },
    });

    console.log(currentMonster);

    return currentMonster;
};

export const insertMonster = async (body: Monster) => {
    const [createdMonster] = await db.insert(monster).values(body).returning();

    return createdMonster;
};

export const updateMonster = async ({ id, ...rest }: { id: number; image: string }) => {
    const [updatedMonster] = await db
        .update(monster)
        .set(rest)
        .where(eq(monster.id, id))
        .returning();

    return updatedMonster;
};

export const deleteMonster = async (id: number) => {
    const [createdMonster] = await db.delete(monster).where(eq(monster.id, id)).returning();

    return createdMonster;
};
