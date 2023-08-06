import { DungeonInfo, GameInfo } from '@/components/About';
import { Header } from '../Header';

interface Props {
    dungeon: Dungeon;
    refetch: () => void;
}

export const DungeonInformation = ({ dungeon, refetch }: Props) => {
    return (
        <div className="w-2/12">
            <div className="flex flex-col">
                <Header text="Подземелье" />
                <div className="m-2">
                    <DungeonInfo
                        dungeon={dungeon}
                        refetch={refetch}
                    />
                </div>
            </div>
        </div>
    );
};
