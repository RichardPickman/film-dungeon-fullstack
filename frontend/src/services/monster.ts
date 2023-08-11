import { create, get, remove, update } from '@/actions/fetch';
import axios from 'axios';
import { updateQuestion } from './question';

const DUNGEON_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/monster`;

type MonsterType = {
    name: string;
    hp: number;
    image?: { fileUrl: string; fileKey: string } | null;
    boss: boolean;
    dungeonId: number;
};

export const createMonster = async (item: MonsterType) => {
    console.log(item);
    const result = await create(`${DUNGEON_ADDRESS}/new`, item);

    return result;
};

export const getMonster = async (monsterId: number) => {
    const response = await get<{}, Monster>(`${DUNGEON_ADDRESS}/${monsterId}`);

    return response;
};

export const updateMonster = async (data: { id: number } & Partial<MonsterType>) => {
    const response = await update<{}, Monster>(`${DUNGEON_ADDRESS}/${data.id}`, data);

    return response;
};

export const getMonsters = async (dungeonId: number) => {
    const response = await get<{}, Monster[]>(`${DUNGEON_ADDRESS}/${dungeonId}/all`);

    return response;
};

export const deleteMonster = async (item: Monster) => {
    if (item.image) {
        await axios.delete(`/api/url?imageKey=${item.image.fileKey}`);
    }

    const result = await remove(`${DUNGEON_ADDRESS}/${item.id}`);

    return result;
};

const BOSS_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/boss`;

export const deleteBoss = async (item: { id?: number; image?: ImageInfo }) => {
    if (item.image) {
        await axios.delete(`/api/url?imageKey=${item.image.fileKey}`);
    }

    const result = await remove(`${BOSS_ADDRESS}/${item.id}`);

    return result;
};

export const updateBoss = async (data: { id: number } & Partial<MonsterType>) => {
    const response = await update<{}, Monster>(`${BOSS_ADDRESS}/${data.id}`, data);

    return response;
};

export const createBoss = async (item: MonsterType) => {
    const result = await create(`${BOSS_ADDRESS}/new`, item);

    return result;
};

export const updateQuestionRelation = async (
    from: 'boss-to-monster' | 'monster-to-boss',
    id: number,
    questions: OneOfQuestions[] | [],
) => {
    if (from === 'boss-to-monster') {
        questions.forEach(async question => {
            await updateQuestion(question.id!, { monsterId: id, id: question.id! });
        });
    }

    if (from === 'monster-to-boss') {
        questions.forEach(async question => {
            await updateQuestion(question.id!, { bossId: id, id: question.id! });
        });
    }
};
