import {
    insertGame,
    getPopulatedGame,
    updateGame,
    deleteGame,
    getAllGames,
    getReadyGame,
} from '../services/game';
import { NextFunction, Request, Response } from 'express';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllGames();

        res.json(result);
    } catch (e) {
        next();
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insertGame(req.body);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getReadyGame(Number(id));

        res.json(result);
    } catch (e) {
        console.log(e);

        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await updateGame(req.body);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteGame(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};
