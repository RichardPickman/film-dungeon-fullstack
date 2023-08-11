import { CurrentCard } from '../CurrentCard';
import { CurrentPlayerHealth } from './Healthbars/Gamer';
import { CurrentMonsterHealth } from './Healthbars/Monster';

export const LeftMenu = () => {
    return (
        <div className="flex flex-col w-full gap-4 p-2">
            <CurrentPlayerHealth />
            <CurrentMonsterHealth />
            <div></div>
        </div>
    );
};
