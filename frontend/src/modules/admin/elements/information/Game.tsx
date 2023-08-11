import { GameInfo } from '../ui/About';
import { Header } from '../Header';

interface Props {
    gameId: number;
}

export const GameInformation = ({ gameId }: Props) => {
    return (
        <div className="flex flex-col">
            <Header text="О игре" />
            <div className="m-2">
                <GameInfo gameId={gameId} />
            </div>
        </div>
    );
};
