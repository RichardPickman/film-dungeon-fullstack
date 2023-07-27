import { NextFunction } from "express";


export const appLogger = (req: any, res: any, next: NextFunction) => {
    const elements = ['headers', 'method', 'url', 'destination', 'body'];

    for (let key of elements) {
        const parsedKey = key.toUpperCase();
        const parsedValue = JSON.stringify(req[key]);

        console.log(`${parsedKey}: ${parsedValue}`);
    }

    console.log('\n');

    next();
}
