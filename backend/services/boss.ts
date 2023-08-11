import { InferModel, eq } from 'drizzle-orm';
import { db } from '../db';
import { boss } from '../db/schemas/game';

type Boss = InferModel<typeof boss>;

export const getBoss = async (id: number) => {
    const currentBoss = await db.query.boss.findFirst({
        where: eq(boss.id, id),
        with: {
            questions: true,
        },
    });

    return currentBoss;
};

export const insertBoss = async (body: Boss) => {
    const [createdBoss] = await db.insert(boss).values(body).returning();

    return createdBoss;
};

export const updateBoss = async ({ id, ...rest }: { id: number } & Boss) => {
    const [updatedBoss] = await db.update(boss).set(rest).where(eq(boss.id, id)).returning();

    return updatedBoss;
};

export const deleteBoss = async (id: number) => {
    const [createdBoss] = await db.delete(boss).where(eq(boss.id, id)).returning();

    return createdBoss;
};
