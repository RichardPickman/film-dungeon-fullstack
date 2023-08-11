import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const CurrentCard = () => {
    const state = useSelector((state: RootState) => state.session);

    if (state.isDungeon && state.dungeon) {
        return (
            <div className="flex items-center justify-center w-full">
                <div>Текущее подземелье: {state.dungeon.name}</div>
            </div>
        );
    }

    if (state.isMonster && state.monster) {
        return (
            <div className="flex items-center justify-center w-full">
                <div>Текущий монстр: {state.monster.name}</div>
            </div>
        );
    }

    if (state.isQuestion && state.question) {
        return (
            <div className="flex items-center justify-center w-full">
                <div>Текущий вопрос: {state.question.question}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div>Текущая игра: {state.game?.name}</div>
        </div>
    );
};
