import { CurrentPlayerHealth } from './Healthbars/Gamer';
import { CurrentMonsterHealth } from './Healthbars/Monster';
import { Pause } from './Pause';

export const LeftMenu = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
            <CurrentPlayerHealth />
            <CurrentMonsterHealth />
            <Pause />
        </div>
    );
};
