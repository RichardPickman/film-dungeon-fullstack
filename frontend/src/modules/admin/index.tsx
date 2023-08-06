'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getDungeons } from '@/services/dungeon';
import { getMonsters } from '@/services/monster';
import { Questions } from '@/modules/admin/elements/ui/Questions';
import { Dungeons } from './elements/controls/Dungeons';
import { Monsters } from './elements/controls/Monsters';
import { ControlsSkeleton } from './elements/controls/Skeleton';
import { GameInformation } from './elements/information/Game';
import { DungeonInformation } from './elements/information/Dungeon';
import { MonsterInformation } from './elements/information/Monster';

const Page = () => {
    const params = useParams();
    const [dungeonId, setCurrentDungeonId] = useState<number | null>(null);
    const [monsterId, setCurrentMonsterId] = useState<number | null>(null);

    const onDungeonChange = (payload: number | null) => {
        setCurrentDungeonId(payload);
    };
    const onMonsterChange = (payload: number | null) => {
        setCurrentMonsterId(payload);
    };

    const onMonsterLeave = () => {
        onDungeonChange(null);
        onMonsterChange(null);
    };

    const dungeons = useQuery({
        queryKey: ['get dungeon', params.id],
        queryFn: () => getDungeons(Number(params.id)),
    });

    const monsters = useQuery({
        queryKey: ['get dungeon', dungeonId],
        queryFn: () => {
            if (dungeonId) {
                return getMonsters(dungeonId);
            }

            return null;
        },
    });

    return (
        <div className="flex w-screen h-screen mx-auto gap-4">
            {/* If there is no dungeonId or monsterId then should be game info */}
            {!dungeonId && !monsterId && <GameInformation gameId={Number(params.id)} />}
            {/* If there is no monsterId then should be dungeon info */}
            {dungeonId && !monsterId && (
                <DungeonInformation
                    dungeon={dungeons.data?.find(item => item.id === dungeonId)!}
                    refetch={dungeons.refetch}
                />
            )}
            {/* If there monsterId then should be monster info */}
            {monsterId && monsters.data && (
                <MonsterInformation
                    monster={monsters.data?.find(item => item.id === monsterId)!}
                    bossId={dungeons.data?.find(item => item.id === dungeonId)?.bossId}
                    refetch={monsters.refetch}
                />
            )}
            <div className="w-full h-full overflow-y-auto flex flex-col gap-4 py-4">
                {monsterId && <Questions monsterId={monsterId} />}
            </div>
            <div className="w-2/12">
                {(dungeons.isLoading || monsters.isLoading) && <ControlsSkeleton />}

                {!dungeonId && !monsterId && dungeons.data && (
                    <Dungeons
                        data={dungeons.data}
                        onDungeonChange={onDungeonChange}
                        refetch={dungeons.refetch}
                        gameId={Number(params.id)}
                    />
                )}

                {dungeonId && monsters.data && (
                    <Monsters
                        data={monsters.data}
                        onMonsterChange={onMonsterChange}
                        refetch={monsters.refetch}
                        dungeonId={dungeonId}
                        onMonsterLeave={onMonsterLeave}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
