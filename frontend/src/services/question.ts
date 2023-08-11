import { create, get, remove, update } from '@/actions/fetch';
import axios from 'axios';

const QUESTION_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/question`;

export const saveQuestion = (body: OneOfQuestions) => {
    if (body.id) {
        return updateQuestion(body.id, body);
    }

    return createQuestion(body);
};

export const createQuestion = async (body: OneOfQuestions) => {
    const response = await create<{}, OneOfQuestions>(`${QUESTION_ADDRESS}/new`, body);

    return response as Question;
};

export const getQuestions = async (monsterId: number) => {
    const response = await get<{}, OneOfQuestions[]>(`${QUESTION_ADDRESS}/${monsterId}/all`);

    return response;
};

export const updateQuestion = async (questionId: number, body: Partial<OneOfQuestions>) => {
    const response = await update<{}, Question>(`${QUESTION_ADDRESS}/${questionId}`, body);

    return response;
};

export const deleteQuestion = async (item: { id: number; image?: ImageInfo | null }) => {
    if (item.image) {
        await axios.delete(`/api/url?imageKey=${item.image.fileKey}`);
    }

    if (!item.id) {
        return;
    }

    const result = await remove(`${QUESTION_ADDRESS}/${item.id}`);

    return result;
};
