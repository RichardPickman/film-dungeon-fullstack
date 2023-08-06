import { InferModel, eq } from 'drizzle-orm';
import { db } from '../db';
import { dungeon } from '../db/schemas/game';

type Dungeon = InferModel<typeof dungeon>;

export const getDungeons = async (id: number) => {
    const dungeons = await db.query.dungeon.findMany({
        where: eq(dungeon.gameId, id),
        with: {
            monsters: true,
        },
    });

    return dungeons;
};

export const insertDungeon = async (body: Dungeon) => {
    const [createdDungeon] = await db.insert(dungeon).values(body).returning();

    return createdDungeon;
};

export const getDungeon = async (id: number) => {
    const currentDungeon = await db.query.dungeon.findFirst({
        where: eq(dungeon.id, id),
        with: {},
    });

    return currentDungeon;
};

export const updateDungeon = async ({ id, ...rest }: { id: number } & Partial<Dungeon>) => {
    const [updatedDungeon] = await db
        .update(dungeon)
        .set({ ...rest, image: rest.image || null })
        .where(eq(dungeon.id, id))
        .returning();

    return updatedDungeon;
};

export const deleteDungeon = async (id: number) => {
    const [createdDungeon] = await db.delete(dungeon).where(eq(dungeon.id, id)).returning();

    return createdDungeon;
};
