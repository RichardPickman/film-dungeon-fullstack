'use client';

import Image from 'next/image';
import { io } from 'socket.io-client';
import { useParams } from 'next/navigation';
import { useState, useLayoutEffect, useEffect } from 'react';

import { Card } from '@/components/Card';
import { HealthBar } from '@/modules/host/elements/ui/HealthBar';
import { Questions } from '@/components/Questions';

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
                {/* HP Bar, Current BOSS */}
                <div className="flex flex-col w-full justify-between">
                    <div className="flex items-center justify-start">
                        <HealthBar>{state.gameHealth}</HealthBar>
                    </div>
                    {state.monster && (
                        <div className="relative h-1/2 w-full -lg overflow-hidden">
                            <div className="absolute top-3 left-3 z-10 w-full h-full">
                                <HealthBar>{state.monsterHealth}</HealthBar>
                            </div>
                            <div className="absolute bg-violet-700  bottom-0 whitespace-nowrap text-center left-0 right-0 z-10 w-full h-8 font-bold">
                                {state.monster?.name}
                            </div>
                            {state.monster?.image && (
                                <Image
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
                    <div className="flex flex-col w-full h-full items-center">
                        <div className="flex flex-col w-full h-full gap-2 overflow-auto items-center justify-center">
                            {state.game?.dungeons.map(dungeon => (
                                <Card
                                    key={dungeon.id + dungeon.name}
                                    onClick={() => {}}
                                    image={dungeon.image}
                                    isActive={false}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {(state.isMonster || state.isQuestion) && (
                    <div className="flex flex-col gap-2 w-full h-full items-center justify-between">
                        <div className="flex flex-col w-full h-full overflow-auto gap-2 items-center justify-center">
                            {state.dungeon?.monsters.map(monster => (
                                <Card
                                    key={monster.id + monster.name}
                                    onClick={() => {}}
                                    image={monster.image}
                                    isActive={false}
                                />
                            ))}
                            {state.dungeon?.boss && (
                                <Card
                                    key={state.dungeon?.boss.id + state.dungeon?.boss.name}
                                    onClick={() => {}}
                                    image={state.dungeon?.boss.image}
                                    isActive={false}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
