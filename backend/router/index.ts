import e, { Request, Response } from "express";


const createGame = (req: Request, res: Response) => {

};

const getGame = (req: Request, res: Response) => {
    console.log('get game');
};

const updateGame = (req: Request, res: Response) => {
    console.log('update game');
};

const deleteGame = (req: Request, res: Response) => {
    console.log('delete game');
};

const router = e();

const handleGame = (req: Request, res: Response) => {
    if (req.method === 'GET') {
        createGame(req, res);
    }

    if (req.method === 'POST') {
        getGame(req, res);
    }

    if (req.method === 'UPDATE') {
        updateGame(req, res);
    }

    if (req.method === 'DELETE') {
        deleteGame(req, res);
    }
}

router.use('/games/new', createGame);
router.use('/games/:id', handleGame);

export default router;
