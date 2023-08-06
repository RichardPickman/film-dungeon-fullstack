import e from 'express';
import { create, remove, update, getAllQuestions, get } from '../controller/question';

const questionRouter = e();

questionRouter.post('/new', create);
questionRouter.put('/:id', update);
questionRouter.delete('/:id', remove);
questionRouter.get('/:id', get);
questionRouter.get('/:id/all', getAllQuestions);

export default questionRouter;
