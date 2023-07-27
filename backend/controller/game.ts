import { insertGame, getGame, updateGame, deleteGame, getAllGames } from "../services/game";
import { NextFunction, Request, Response } from "express";


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllGames();

        console.log('get all worked')

        res.json(result);
    } catch (e) {
        next();
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insertGame(req.body);

        res.json();
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getGame(Number(id));

        res.json(result);
    } catch (e) {
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
