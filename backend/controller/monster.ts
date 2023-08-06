import { updateDungeon } from '../services/dungeon';
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
        const result = await insertMonster(rest);

        if (boss) {
            await updateDungeon({ id: rest.dungeonId, bossId: result.id });
        }

        res.json(result);
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getMonster(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boss, ...rest } = req.body;
        const result = await updateMonster(rest);

        if (boss) {
            await updateDungeon({ id: rest.dungeonId, bossId: result.id });
        }

        if (!boss) {
            await updateDungeon({ id: rest.dungeonId, bossId: null });
        }

        res.json(result);
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteMonster(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};
