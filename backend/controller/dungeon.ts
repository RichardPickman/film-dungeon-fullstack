import { insertDungeon, getDungeon, updateDungeon, deleteDungeon } from "../services/dungeon";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

const mockDungeons = [
    { id: 1, name: "First game" },
    { id: 2, name: "Second game" },
];

export const getDungeons = async (req: Request, res: Response, next: NextFunction) => {
    res.json(mockDungeons);
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
