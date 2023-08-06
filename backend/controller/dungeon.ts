import {
    insertDungeon,
    getDungeon,
    updateDungeon,
    deleteDungeon,
    getDungeons,
} from '../services/dungeon';
import { NextFunction, Request, Response } from 'express';

export const getAllDungeons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getDungeons(Number(req.params.id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insertDungeon(req.body);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getDungeon(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await updateDungeon(req.body);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteDungeon(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};
