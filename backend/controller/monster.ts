import { deleteBoss, getBoss, insertBoss, updateBoss } from '../services/boss';
import {
    insertMonster,
    getMonster,
    updateMonster,
    deleteMonster,
    getMonsters,
} from '../services/monster';
import { NextFunction, Request, Response } from 'express';

export const getAllMonsters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getMonsters(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boss, ...rest } = req.body;

        if (boss) {
            const result = await insertBoss(rest);

            res.json(result);
            return;
        }

        const result = await insertMonster(rest);

        res.json(result);

        return;
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getMonster(Number(id));

        if (!result) {
            const boss = await getBoss(Number(id));

            res.json(boss);
            return;
        }

        res.json(result);
    } catch (e) {
        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boss, ...rest } = req.body;
        const query = req.query;
        console.log(query);

        if (boss) {
            const result = await updateBoss(rest);

            res.json(result);
        }

        if (!boss) {
            const result = await updateMonster(rest);

            res.json(result);
        }
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteMonster(Number(id));

        if (!result) {
            const query = req.query;

            console.log(query);
            const boss = await deleteBoss(Number(id));

            res.json(boss);
            return;
        }

        res.json(result);
    } catch (e) {
        next();
    }
};
