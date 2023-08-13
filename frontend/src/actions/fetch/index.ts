import axios from 'axios';

const json = (data: unknown) => JSON.stringify(data);

export const create = async <T, U>(url: string, values: T) => {
    try {
        const { data } = await axios.post(url, values);

        return data as U;
    } catch (e) {
        throw new Error('Error during creating of item');
    }
};

export const get = async <T, U>(url: string) => {
    try {
        const { data } = await axios.get(url).catch(err => err.response);

        return data as U;
    } catch (e: unknown) {
        throw new Error('Error during getting an items');
    }
};

export const update = async <T, U>(url: string, values: unknown) => {
    try {
        const { data } = await axios.put(url, values);

        return data as U;
    } catch (e) {
        throw new Error('Error during updating an item');
    }
};

export const remove = async <T, U>(url: string) => {
    try {
        const { data } = await axios.delete(url);

        return data as T;
    } catch (e) {
        throw new Error('Error during removing an item');
    }
};
