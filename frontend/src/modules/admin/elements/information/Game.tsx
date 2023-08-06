import { GameInfo } from '@/components/About';
import { Header } from '../Header';

interface Props {
    gameId: number;
}

export const GameInformation = ({ gameId }: Props) => {
    return (
        <div className="w-2/12">
            <div className="flex flex-col">
                <Header text="О игре" />
                <div className="m-2">
                    <GameInfo gameId={gameId} />
                </div>
            </div>
        </div>
    );
};
