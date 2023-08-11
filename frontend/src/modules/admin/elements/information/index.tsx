import { useContext } from 'react';
import { CreatorContext } from '../../context';
import { DungeonInformation } from './Dungeon';
import { GameInformation } from './Game';
import { MonsterInformation } from './Monster';

export const InstanceInformation = () => {
    const context = useContext(CreatorContext);

    if (!context?.state.game?.id) {
        console.log('No game id found');

        return null;
    }

    return (
        <div className="flex flex-col w-full h-full  items-center justify-start">
            {context.state.isGame && <GameInformation gameId={context.state.game?.id} />}

            {context?.state.isDungeons && (
                <DungeonInformation dungeon={context.state.dungeon as Dungeon} />
            )}

            {context?.state.isMonsters && !context?.state.monster && (
                <DungeonInformation dungeon={context.state.dungeon as Dungeon} />
            )}

            {context?.state.isMonsters && context?.state.monster && <MonsterInformation />}
        </div>
    );
};
