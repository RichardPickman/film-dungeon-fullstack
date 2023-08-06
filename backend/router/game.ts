import e from 'express';
import { create, remove, get, update, getAll } from '../controller/game';

const gameRouter = e();
gameRouter.post('/new', create);
gameRouter.get('/:id', get);
gameRouter.put('/:id', update);
gameRouter.delete('/:id', remove);
gameRouter.get('/', getAll);

export default gameRouter;
