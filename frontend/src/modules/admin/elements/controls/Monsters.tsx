import { MonsterCreate } from '@/modules/admin/elements/ui/GameSelectors';
import { Header } from '../Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';
import { CreatorContext } from '../../context';
import { useContext } from 'react';
import { DeleteContextMenu } from './DeleteContextMenu';
import { deleteMonster } from '@/services/monster';

export const Monsters = () => {
    const context = useContext(CreatorContext);

    const onMonsterChange = (monster: Monster) => {
        context?.onInstancesChange({ monster });
        context?.onBooleanChange({ isQuestions: true, isMonsters: true });
    };

    const onMonsterLeave = () => {
        context?.onInstancesChange({ monster: null });
        context?.onBooleanChange({ isQuestions: false, isMonsters: false, isDungeons: true });
    };

    const onDelete = async (item: Monster) => {
        await deleteMonster(item);
        context?.refetchAll();
    };

    const boss = context?.state.dungeon?.boss;

    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <Header text="Монстры" />
            <div className="w-full h-full flex flex-col items-center gap-4">
                {context?.state.dungeon?.monsters?.map(item => (
                    <DeleteContextMenu
                        key={item.id + item.name}
                        className="w-full flex flex-col items-center"
                        onDelete={() => onDelete(item)}
                    >
                        <Card
                            key={item.id}
                            image={item.image}
                            onClick={() => onMonsterChange(item)}
                        />
                    </DeleteContextMenu>
                ))}
                {boss && (
                    <DeleteContextMenu
                        key={boss.id + boss.name}
                        className="w-full flex flex-col items-center"
                        onDelete={() => onDelete(boss)}
                    >
                        <Card
                            image={boss.image}
                            onClick={() => onMonsterChange(boss)}
                        />
                    </DeleteContextMenu>
                )}
                {context?.state.dungeon?.id && (
                    <MonsterCreate dungeonId={context?.state.dungeon?.id} />
                )}
            </div>
            <div className="flex flex-col w-full p-2">
                <Button
                    variant="default"
                    onClick={onMonsterLeave}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
