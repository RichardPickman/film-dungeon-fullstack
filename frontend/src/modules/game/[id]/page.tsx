'use client';

import Image from 'next/image';
import { io } from 'socket.io-client';
import { useParams } from 'next/navigation';
import { useState, useLayoutEffect } from 'react';

import { HealthBar } from '@/modules/host/elements/ui/HealthBar';
import { Questions } from '@/components/Questions';
import { CardsWithStatus } from './elements/Card';
import { Crown } from 'lucide-react';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ADDRESS!);

const Page = () => {
    const { id } = useParams();
    const [state, setState] = useState<GameState | null>(null);

    useLayoutEffect(() => {
        socket.on('connect', () => socket.emit('join_room', { sessionId: id }));
        socket?.on('joined_room', data => setState(data));
        socket?.on('state_change', data => setState(data));
    }, [id]);

    if (state === null) {
        return <div className="flex w-screen h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex w-screen h-screen bg-green-700">
            <div className="flex w-3/12 pl-6 pt-12 pb-6 gap-6">
                <div className="flex flex-col w-full justify-between">
                    <div className="flex items-center justify-start">
                        <HealthBar>{state.gameHealth}</HealthBar>
                    </div>
                    {state.monster && (
                        <div className="relative h-1/2 w-full overflow-hidden rounded">
                            {state.monster.id === state.dungeon?.boss.id &&
                                state.monster.name === state.dungeon?.boss.name && (
                                    <Crown
                                        className="absolute w-10 h-10 top-2 right-2 z-10"
                                        color="#FDE047"
                                    />
                                )}
                            <div className="absolute top-3 left-3 z-10 w-full h-full">
                                <HealthBar>{state.monsterHealth}</HealthBar>
                            </div>
                            <div className="w-full h-10 flex items-center justify-center absolute bg-violet-700 rounded bottom-0 whitespace-nowrap left-0 right-0 z-10">
                                <p className="text-center font-bold">{state.monster?.name}</p>
                            </div>
                            {state.monster?.image && (
                                <Image
                                    className="object-cover"
                                    src={state.monster.image.fileUrl}
                                    fill
                                    alt="current boss"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 px-6 pt-12 pb-6 w-full">
                {state.question && (
                    <Questions
                        question={state.question}
                        monster={state.monster}
                        isImageShowing={state.isImageShowing}
                    />
                )}
            </div>
            <div className="flex flex-col w-2/12 h-screen border-l border-y border-gray-500 bg-gradient-to-b from-gray-900 to-gray-950 p-2 gap-4">
                {state.isDungeon && state.game?.dungeons && (
                    <CardsWithStatus
                        arr={state.game?.dungeons || []}
                        currentItem={state.dungeon}
                    />
                )}
                {(state.isMonster || state.isQuestion) && state.dungeon?.monsters && (
                    <CardsWithStatus
                        arr={[...state.dungeon?.monsters, state.dungeon?.boss]}
                        currentItem={state.monster}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
