export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface Game {
    id: string;
    name: string;
}
