import { create, get, remove, update } from '@/actions/fetch';
import axios from 'axios';

const DUNGEON_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/dungeon`;

export const createDungeon = async (item: {
    gameId: number;
    name: string;
    image: ImageInfo | null;
}) => {
    const result = await create(`${DUNGEON_ADDRESS}/new`, item);

    return result as Dungeon;
};

export const getDungeons = async (gameId: number) => {
    const response = await get<{}, Dungeon[]>(`${DUNGEON_ADDRESS}/${gameId}/all`);

    return response;
};

export const getDungeon = async (gameId: number) => {
    const response = await get<{}, Dungeon>(`${DUNGEON_ADDRESS}/${gameId}`);

    return response;
};

export const updateDungeon = async (data: {
    id: number;
    name?: string;
    image?: { fileUrl: string; fileKey: string } | null;
    gameId: number;
}) => {
    const response = await update<{}, Dungeon>(`${DUNGEON_ADDRESS}/${data.id}`, data);

    return response;
};

export const deleteDungeon = async (item: Dungeon) => {
    if (item.image) {
        await axios.delete(`/api/url?imageKey=${item.image.fileKey}`);
    }

    const result = await remove(`${DUNGEON_ADDRESS}/${item.id}`);

    return result;
};
