import { DungeonInfo, GameInfo } from '../ui/About';
import { Header } from '../Header';

interface Props {
    dungeon: Dungeon;
}

export const DungeonInformation = ({ dungeon }: Props) => {
    return (
        <div className="flex flex-col">
            <Header text="Подземелье" />
            <div className="m-2">
                <DungeonInfo dungeon={dungeon} />
            </div>
        </div>
    );
};
