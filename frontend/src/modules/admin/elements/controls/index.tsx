import { useContext } from 'react';
import { CreatorContext } from '../../context';
import { ControlsSkeleton } from './Skeleton';
import { Dungeons } from './Dungeons';
import { Monsters } from './Monsters';

export const ControlsMenu = () => {
    const context = useContext(CreatorContext);

    if (!context?.state.game) {
        return <ControlsSkeleton />;
    }

    return (
        <div className="flex flex-col w-full h-full justify-center">
            {context.state.isDungeons && <Dungeons />}
            {context.state.isMonsters && <Monsters />}
        </div>
    );
};
