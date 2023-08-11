import { DungeonCreate } from '@/modules/admin/elements/ui/GameSelectors';
import { Header } from '../Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CreatorContext } from '../../context';

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

    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <Header text="Подземелья" />
            <div className="w-full h-full flex flex-col items-center gap-4">
                {context.state.game.dungeons.map(item => (
                    <Card
                        key={item.id}
                        image={item.image}
                        onClick={() => onDungeonChange(item)}
                    />
                ))}
                <DungeonCreate gameId={context?.state.game.id} />
            </div>
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
