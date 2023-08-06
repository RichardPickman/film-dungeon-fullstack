import { eq } from 'drizzle-orm';
import { db } from '../db';
import { game } from '../db/schemas/game';

export const getPopulatedGame = async (id: number) => {
    const currentGame = await db.query.game.findFirst({
        where: eq(game.id, id),
        with: {
            dungeons: true,
        },
    });

    return currentGame;
};

export const getAllGames = async () => {
    const games = await db.select().from(game);

    return games;
};

export const insertGame = async (body: { name: string }) => {
    const [createdGame] = await db.insert(game).values(body).returning();

    return createdGame;
};

export const getGame = async (id: number) => {
    const [currentGame] = await db.select().from(game).where(eq(game.id, id));

    return currentGame;
};

export const updateGame = async ({ id, ...rest }: { id: number; name: string }) => {
    const [updatedGame] = await db.update(game).set(rest).where(eq(game.id, id)).returning();

    return updatedGame;
};

export const deleteGame = async (id: number) => {
    const [createdGame] = await db.delete(game).where(eq(game.id, id)).returning();

    return createdGame;
};
