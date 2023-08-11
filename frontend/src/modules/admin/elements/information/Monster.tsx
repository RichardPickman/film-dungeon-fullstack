import { MonsterInfo } from '../ui/About';
import { Header } from '../Header';

export const MonsterInformation = () => {
    return (
        <div className="flex flex-col">
            <Header text="Монстр" />
            <div className="m-2">
                <MonsterInfo />
            </div>
        </div>
    );
};
