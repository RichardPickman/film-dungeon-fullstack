'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setGame } from '@/store/reducers/creator';
import { Question } from './elements/Question/Question';
import { RightMenu } from './elements/Menus/Right';
import { RoomId } from './elements/RoomId';
import { LeftMenu } from './elements/Menus/Left';
import { RootState } from '@/store';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ADDRESS!);

const Page = () => {
    const { id: gameId } = useParams();
    const [roomId, setRoomId] = useState<string | null>(null);
    const state = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (state.sessionId) {
            return;
        }

        socket.on('connect', () => socket?.emit('create_room', { id: gameId, ...state }));
        socket.on('create_room_error', error => console.log(error));
        socket.on('created_room', (data: GameState) => {
            console.log(data);
            setRoomId(data.sessionId);

            dispatch(setGame(data));
        });
    }, [gameId, state, dispatch]);

    useEffect(() => {
        if (state.sessionId) {
            socket?.emit('host_change', state);
        }
    }, [state]);

    if (roomId === null) {
        return <div className="flex w-screen h-screen items-center justify-center">Loading...</div>;
    }

    return state.game && roomId ? (
        <div className="flex gap-4 w-screen h-screen">
            <div className="w-2/12">
                <LeftMenu />
            </div>
            <div className="flex flex-col w-8/12 gap-2 items-center">
                <RoomId roomId={roomId} />
                <Question />
            </div>
            <div className="w-2/12">
                <RightMenu />
            </div>
        </div>
    ) : null;
};

export default Page;
