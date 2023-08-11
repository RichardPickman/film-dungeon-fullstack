import e from 'express';
import gameRouter from './game';
import dungeonRouter from './dungeon';
import monsterRouter from './monster';
import questionRouter from './question';
import bossRouter from './boss';

const router = e();

router.use('/game', gameRouter);

router.use('/dungeon', dungeonRouter);

router.use('/monster', monsterRouter);

router.use('/question', questionRouter);

router.use('/boss', bossRouter);

export default router;
