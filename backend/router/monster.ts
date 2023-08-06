import e from 'express';
import { create, remove, get, getAllMonsters, update } from '../controller/monster';

const monsterRouter = e();

monsterRouter.post('/new', create);
monsterRouter.get('/:id', get);
monsterRouter.put('/:id', update);
monsterRouter.delete('/:id', remove);
monsterRouter.get('/:id/all', getAllMonsters);

export default monsterRouter;
