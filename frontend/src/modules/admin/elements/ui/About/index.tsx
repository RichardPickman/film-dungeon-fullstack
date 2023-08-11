import { getGame } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { DungeonUpdate, MonsterUpdate } from './Updaters';
import Image from 'next/image';
import { useContext } from 'react';
import { CreatorContext } from '@/modules/admin/context';

export const MonsterInfo = () => {
    const context = useContext(CreatorContext);
    const monster = context?.state.monster;

    if (!monster) {
        console.log('There is no monster provided');

        return null;
    }

    if (!monster.id) {
        console.log('There is no monster id provided');

        return null;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            {monster.image && monster.image.fileUrl && (
                <div className="relative w-10/12 aspect-square ">
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
                <p>Количество вопросов: {monster.questions?.length}</p>
                <p>Босс: {monster === context.state.dungeon?.boss ? 'Да' : 'Нет'}</p>
            </div>
            <MonsterUpdate key={monster.id} />
        </div>
    );
};

interface DungeonProps {
    dungeon?: Dungeon;
}

export const DungeonInfo = ({ dungeon }: DungeonProps) => {
    if (!dungeon) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            {dungeon.image && (
                <div className="relative w-10/12 aspect-square ">
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
                <DungeonUpdate previousData={dungeon} />
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
