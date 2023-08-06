import { get } from '@/actions/fetch';
import axios from 'axios';

type ImageData = { key: string; url: string };

export const getImageKey = (fileUrl: string) => {
    const arr = fileUrl.split('/');

    if (!arr[arr.length - 1]) {
        throw new Error('Ошибка при определении ключа для картинки');
    }

    return arr[arr.length - 1];
};
export const deleteImage = async (image: { fileUrl: string; fileKey: string }) =>
    await axios.delete(`/api/url?imageKey=${image.fileKey}`);

export const getUrl = async (fileKey: string) =>
    await get<{}, ImageData[]>(`/api/url?imageKey=${fileKey}`)
        .then(res => res[0].url)
        .catch(err => undefined);
