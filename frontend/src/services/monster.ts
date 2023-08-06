import { create, get, remove, update } from '@/actions/fetch';
import axios from 'axios';

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

    return result as Monster;
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
