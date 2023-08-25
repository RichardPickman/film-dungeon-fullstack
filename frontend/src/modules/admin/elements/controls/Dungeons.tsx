import { DungeonCreate } from '@/modules/admin/elements/ui/GameSelectors';
import { Header } from '../Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CreatorContext } from '../../context';
import { DeleteContextMenu } from './DeleteContextMenu';
import { deleteDungeon } from '@/services/dungeon';

export const Dungeons = () => {
    const context = useContext(CreatorContext);
    const router = useRouter();

    const onDungeonChange = (dungeon: Dungeon) => {
        context?.onInstancesChange({ monster: null, dungeon });
        context?.onBooleanChange({ isMonsters: true });
    };

    if (!context?.state.game?.dungeons) {
        console.log('There is no game instance to proceed');

        return null;
    }

    const onDelete = async (item: Dungeon) => {
        await deleteDungeon(item);
        context?.refetchAll();
    };

    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <Header text="Подземелья" />
            <div className="w-full h-full flex flex-col items-center gap-4">
                {context.state.game.dungeons.map(item => (
                    <DeleteContextMenu
                        key={item.id + item.name}
                        className="w-full flex flex-col items-center"
                        onDelete={() => onDelete(item)}
                    >
                        <Card
                            image={item.image}
                            onClick={() => onDungeonChange(item)}
                        />
                    </DeleteContextMenu>
                ))}
            </div>
            <DungeonCreate gameId={context?.state.game.id} />
            <div className="flex flex-col w-full p-2">
                <Button
                    variant="default"
                    onClick={() => router.push('/admin')}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
