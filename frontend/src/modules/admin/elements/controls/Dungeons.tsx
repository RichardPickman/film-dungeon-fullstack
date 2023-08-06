import { DungeonCreate } from '@/modules/admin/elements/ui/GameSelectors';
import { Header } from '../Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';
import { useRouter } from 'next/navigation';

interface Props {
    data?: Dungeon[];
    onDungeonChange: (monsterId: number) => void;
    refetch: () => void;
    gameId: number;
}

export const Dungeons = (props: Props) => {
    const { data, onDungeonChange, refetch, gameId } = props;
    const router = useRouter();

    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <Header text="Подземелья" />
            <div className="w-full h-full flex flex-col items-center gap-4">
                {data &&
                    data.map(item => (
                        <Card
                            key={item.id}
                            image={item.image}
                            onClick={() => onDungeonChange(item.id!)}
                        />
                    ))}
                <DungeonCreate
                    gameId={gameId}
                    onCreate={refetch}
                />
            </div>
            <div className="flex flex-col w-full p-2">
                <Button
                    variant="outline"
                    onClick={() => router.push('/admin')}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
