import { InferModel, eq } from 'drizzle-orm';
import { db } from '../db';
import { question } from '../db/schemas/game';

type Question = InferModel<typeof question>;

export const getQuestions = async (id: number) => {
    const questions = await db.select().from(question).where(eq(question.monsterId, id));

    return questions;
};

export const getQuestion = async (id: number) => {
    const questions = await db.select().from(question).where(eq(question.id, id));

    return questions;
};

export const insertQuestion = async (body: Question) => {
    const [createdQuestion] = await db.insert(question).values(body).returning();

    console.log('Saved', createdQuestion);

    return createdQuestion;
};

export const updateQuestion = async ({ id, ...rest }: { id: number; image: string }) => {
    console.log({ id, rest });
    const [updatedQuestion] = await db
        .update(question)
        .set(rest)
        .where(eq(question.id, id))
        .returning();

    return updatedQuestion;
};

export const deleteQuestion = async (id: number) => {
    const [createdQuestion] = await db.delete(question).where(eq(question.id, id)).returning();

    return createdQuestion;
};
