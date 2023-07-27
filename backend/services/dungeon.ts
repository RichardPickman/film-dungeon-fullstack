import { eq } from "drizzle-orm";
import { db } from "../db";
import { dungeon } from "../db/schemas/game";

export const insertDungeon = async (body: { image: string }) => {
    const [createdDungeon] = await db.insert(dungeon).values(body).returning();

    return createdDungeon;
};

export const getDungeon = async (id: number) => {
    const [currentDungeon] = await db.select().from(dungeon).where(eq(dungeon.id, id));

    return currentDungeon;
};

export const updateDungeon = async ({ id, ...rest }: { id: number, image: string }) => {
    const [updatedDungeon] = await db.update(dungeon).set(rest).where(eq(dungeon.id, id)).returning();

    return updatedDungeon;
};

export const deleteDungeon = async (id: number) => {
    const [createdDungeon] = await db.delete(dungeon).where(eq(dungeon.id, id)).returning();

    return createdDungeon;
};
