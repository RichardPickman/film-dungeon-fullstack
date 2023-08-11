'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { io } from 'socket.io-client';
import { useParams } from 'next/navigation';
import { useState, useLayoutEffect, useEffect } from 'react';

import { Card } from '@/components/Card';
import { HealthBar } from '@/modules/host/elements/ui/HealthBar';

const socket = io('http://localhost:5005');

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
            <div className="flex w-full mx-6 my-12 gap-6">
                {/* HP Bar, Current BOSS */}
                <div className="flex flex-col justify-between w-3/12 bg-gray-500">
                    <div className="flex items-center justify-start p-2">
                        <HealthBar>{state.gameHealth}</HealthBar>
                    </div>
                    <div className="relative h-1/2 w-full p-4 -lg overflow-hidden">
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
                </div>
                {/* Image, question  */}
                <div className="flex flex-col gap-4 w-full">
                    <div className="w-full h-4/6">
                        {state.question && state.question.image && state.isImageShowing && (
                            <div className="relative w-full bg-transparent h-full -xl overflow-hidden aspect-video">
                                <Image
                                    className="object-fill"
                                    src={state.question.image?.fileUrl}
                                    fill
                                    alt="question-image"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 text-xl w-full h-2/6 bg-yellow-300 p-4">
                        {/* Question text */}
                        <div className="">{state.question?.question}</div>
                        {/* Question additions */}
                        {state.question?.type === 'multiple' && (
                            <div className="flex gap-4 items-center justify-around ">
                                {state.question.answers.map((answer, index) => (
                                    <p key={answer + index}>{answer}</p>
                                ))}
                            </div>
                        )}
                        {state.question?.type === 'mapper' && (
                            <div className="flex gap-4 items-center justify-around ">
                                <div>
                                    {state.question.letters.map((answer, index) => (
                                        <p key={answer + index}>{answer}</p>
                                    ))}
                                </div>
                                <div>
                                    {state.question.numbers.map((answer, index) => (
                                        <p key={answer + index}>{answer}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-2/12 h-screen border-l border-y border-gray-500 bg-gradient-to-b from-gray-900 to-gray-950 -l-lg p-4 gap-4">
                {state.isDungeon && state.game?.dungeons && (
                    <div className="flex flex-col gap-2 w-full h-full items-center">
                        <div className="flex items-center justify-center w-full p-2 border-b">
                            Подземелья
                        </div>
                        <div className="flex flex-col w-full h-full overflow-auto items-center">
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
                        <div className="flex flex-col w-full h-full overflow-auto gap-2 items-center">
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
