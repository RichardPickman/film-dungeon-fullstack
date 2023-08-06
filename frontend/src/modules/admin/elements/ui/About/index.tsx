import { getGame } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { DungeonUpdate, MonsterUpdate } from './Updaters';
import Image from 'next/image';

interface MonsterProps {
    monster?: Monster;
    refetch: () => void;
    bossId?: number;
}

export const MonsterInfo = ({ monster, bossId, refetch }: MonsterProps) => {
    if (!monster) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            {monster.image && (
                <div className="relative w-10/12 aspect-square rounded">
                    <Image
                        src={monster.image.fileUrl}
                        fill
                        alt="Монстр"
                    />
                </div>
            )}
            <div className="flex flex-col">
                <p>Текущий монстр: {monster.name}</p>
                <p>Здоровье: {monster.hp}</p>
                <p>Количество вопросов: {monster.questions.length}</p>
                <p>Босс: {bossId === monster.id ? 'Да' : 'Нет'}</p>
            </div>
            <MonsterUpdate
                previousData={{ ...monster, boss: bossId === monster.id }}
                onUpdate={refetch}
            />
        </div>
    );
};

interface DungeonProps {
    dungeon?: Dungeon;
    refetch: () => void;
}

export const DungeonInfo = ({ dungeon, refetch }: DungeonProps) => {
    if (!dungeon) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            {dungeon.image && (
                <div className="relative w-10/12 aspect-square rounded">
                    <Image
                        src={dungeon.image.fileUrl}
                        fill
                        alt="Данж"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4">
                <p>Текущее подземелье: {dungeon.name}</p>
                <div className="flex flex-col gap-2">
                    <p>Монстры:</p>
                    <div className="flex flex-col gap-1 ml-2">
                        {dungeon.monsters.map(monster => (
                            <p key={monster.id}>{monster.name}</p>
                        ))}
                    </div>
                </div>
                <DungeonUpdate
                    previousData={dungeon}
                    onUpdate={refetch}
                />
            </div>
        </div>
    );
};

export const GameInfo = ({ gameId }: { gameId: number }) => {
    const query = useQuery({
        queryKey: ['get game info', gameId],
        queryFn: () => getGame(gameId),
    });

    return (
        <div className="flex flex-col gap-4">
            <p>Текущее игра: {query.data?.name}</p>
            <div className="flex flex-col gap-2">
                <p>Подземелья:</p>
                <div className="flex flex-col gap-1 ml-2">
                    {query.data?.dungeons.map(dungeon => <p key={dungeon.id}>{dungeon.name}</p>)}
                </div>
            </div>
        </div>
    );
};
