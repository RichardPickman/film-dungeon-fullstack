import { get } from '@/actions/fetch';

const GAME_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/game`;

export const getGame = async (id: number) => {
    const response = await get<{}, Game>(`${GAME_ADDRESS}/${id}`);

    return response;
};
