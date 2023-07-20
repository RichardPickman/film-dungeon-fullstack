const API_URL = process.env.API_URL;

type URL = string | undefined;
type Method = string;
type Headers = HeadersInit | undefined;

const fetchGame = async (method: Method, headers: Headers, body?: Store | {}, url: URL = '') =>
    await fetch(`${API_URL}/game${url}`, {
        method,
        headers,
        body: JSON.stringify(body),
    }).then(res => res.json());

export const postGame = async (data: Store) => await fetchGame('POST', {}, data);

export const getGame = async (id: string) => await fetchGame('GET', {}, {}, `/${id}`);

export const putGame = async (data: Store) => await fetchGame('PUT', {}, data);

export const deleteGame = async (id: string) => await fetchGame('DELETE', {}, {}, `/${id}`);
