import e from 'express';
import { create, remove, update, getAllDungeons, get } from '../controller/dungeon';

const dungeonRouter = e();

dungeonRouter.post('/new', create);
dungeonRouter.put('/:id', update);
dungeonRouter.delete('/:id', remove);
dungeonRouter.get('/:id', get);

dungeonRouter.get('/:id/all', getAllDungeons);

export default dungeonRouter;
