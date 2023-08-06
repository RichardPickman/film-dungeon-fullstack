import { MonsterCreate } from '@/modules/admin/elements/ui/GameSelectors';
import { Header } from '../Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';

interface Props {
    data: Monster[];
    onMonsterChange: (monsterId: number) => void;
    refetch: () => void;
    dungeonId: number;
    onMonsterLeave: () => void;
}

export const Monsters = (props: Props) => {
    const { data, onMonsterChange, refetch, dungeonId, onMonsterLeave } = props;

    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <Header text="Монстры" />
            <div className="w-full h-full flex flex-col items-center gap-4">
                {data.map(item => (
                    <Card
                        key={item.id}
                        image={item.image}
                        onClick={() => onMonsterChange(item.id!)}
                    />
                ))}
                <MonsterCreate
                    dungeonId={dungeonId}
                    onCreate={refetch}
                />
            </div>
            <div className="flex flex-col w-full p-2">
                <Button
                    variant="outline"
                    onClick={onMonsterLeave}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
