import {
    insertQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestions,
    getQuestion,
} from '../services/question';
import { NextFunction, Request, Response } from 'express';

export const getAllQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(405).json({ message: 'Id not found' });
        }

        const result = await getQuestions(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(405).json({ message: 'Id not found' });
        }

        const result = await getQuestion(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insertQuestion(req.body);

        res.json(result);
    } catch (e) {
        console.log(e);
        next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await updateQuestion(req.body);

        res.json(result);
    } catch (e) {
        next();
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await deleteQuestion(Number(id));

        res.json(result);
    } catch (e) {
        next();
    }
};
