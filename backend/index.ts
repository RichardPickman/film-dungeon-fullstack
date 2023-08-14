import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router';
import { configs } from './config';
import { appLogger } from './middlewares';
import { errorHandler } from './middlewares/ErrorHandler';

import { Server } from 'socket.io';
import { randomUUID } from 'crypto';
import { getReadyGame } from './services/game';
import { db } from './db';
import { session } from './db/schemas/session';
import { eq } from 'drizzle-orm';

const { PORT, FRONTEND_ADDRESS } = configs;
const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(
    cors({
        origin: FRONTEND_ADDRESS!,
    })
);
// app.use(appLogger);
app.use(router);
app.use(errorHandler);

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const io = new Server(5005, {
    cors: {
        origin: FRONTEND_ADDRESS!,
    },
});

io.on('connection', socket => {
    socket.on('create_room', async data => {
        const { id: gameId, ...sessionData } = data;
        const id = randomUUID();

        try {
            const currentGame = await getReadyGame(Number(gameId));

            if (!currentGame) {
                throw new Error('Game not found');
            }

            console.log(`Room ${id} created`);

            const state = {
                ...sessionData,
                isDungeon: Boolean(currentGame.dungeons[0]),
                sessionId: id,
                game: currentGame,
            };

            const game = await db.insert(session).values(state).returning();

            socket.join(id);

            console.log(`Current game: ${JSON.stringify(game)}`);

            socket.emit('created_room', game[0]);
        } catch (e) {
            console.log(e);
            socket.emit('create_room_error', e);
        }
    });

    socket.on('host_change', async data => {
        try {
            console.log(`Updating data of game ${data.sessionId}`);

            const { sessionId, ...rest } = data;

            const [game] = await db
                .update(session)
                .set(rest)
                .where(eq(session.sessionId, sessionId))
                .returning();

            console.log(`Game updated: ${sessionId} ${game}`);

            if (!game.isPaused) {
                socket.to(sessionId).emit('state_change', game);
            }
        } catch (e) {
            console.log(e);
            socket.emit('create_room_error', e);
        }
    });

    socket.on('join_room', async data => {
        try {
            const { sessionId } = data;
            socket.join(sessionId);

            console.log('Join room: ', sessionId);
            const game = await db.select().from(session).where(eq(session.sessionId, sessionId));

            socket.emit('state_change', game[0]);
        } catch (e) {
            console.log(e);
            socket.emit('join_room_error', e);
        }
    });
});
