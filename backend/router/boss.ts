import e from 'express';
import { create, remove, get, update } from '../controller/boss';

const bossRouter = e();

bossRouter.post('/new', create);
bossRouter.get('/:id', get);
bossRouter.put('/:id', update);
bossRouter.delete('/:id', remove);

export default bossRouter;
