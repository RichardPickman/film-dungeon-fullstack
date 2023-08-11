import { deleteBoss, getBoss, insertBoss, updateBoss } from '../services/boss';
import { NextFunction, Request, Response } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boss, ...rest } = req.body;

        const result = await insertBoss(rest);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const boss = await getBoss(Number(id));

        res.json(boss);
    } catch (e) {
        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boss, ...rest } = req.body;

        const result = await updateBoss(rest);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const boss = await deleteBoss(Number(id));

        res.json(boss);
    } catch (e) {
        next();
    }
};
