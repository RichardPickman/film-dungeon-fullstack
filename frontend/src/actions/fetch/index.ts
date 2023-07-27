import axios, { AxiosError } from 'axios';

const json = (data: unknown) => JSON.stringify(data);

export const create = async <T>(url: string, values: T) => {
    try {
        const { data } = await axios.post(url, values);

        return data as Game;
    } catch (e) {
        throw new Error('Error during creating of item');
    }
};

export const get = async <T>(url: string) => {
    try {
        const { data } = await axios.get(url).catch(err => err.response);

        return data as T;
    } catch (e: unknown) {
        throw new Error('Error during getting an items');
    }
};

export const update = async (url: string, values: unknown) => {
    try {
        const { data } = await axios.put(url, values);

        return data as Game;
    } catch (e) {
        throw new Error('Error during updating an item');
    }
};

export const remove = async (url: string) => {
    try {
        const { data } = await axios.delete(url);

        return data as Game;
    } catch (e) {
        throw new Error('Error during removing an item');
    }
};
