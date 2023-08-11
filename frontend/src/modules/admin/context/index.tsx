import { getGame } from '@/services';
import { getDungeons } from '@/services/dungeon';
import { getMonsters } from '@/services/monster';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useLayoutEffect, useState } from 'react';

const initialState: CreatorState = {
    game: null,
    dungeon: null,
    monster: null,
    question: null,
    isGame: true,
    isDungeons: true,
    isMonsters: false,
    isQuestions: false,
};

type InstanceChangeType = Partial<Dungeon[] | Game | Monster[] | OneOfQuestions[] | null>;

type CreatorState = {
    game: Required<Game> | null;
    dungeon: Partial<Dungeon> | null;
    monster: Partial<Monster> | null;
    question: Partial<OneOfQuestions> | null;
    isGame: boolean;
    isDungeons: boolean;
    isMonsters: boolean;
    isQuestions: boolean;
};

type Context = {
    state: CreatorState;
    onBooleanChange: (data: Record<string, boolean>) => void;
    onInstancesChange: (data: Record<string, InstanceChangeType>) => void;
    refetchAll: () => void;
};

export const CreatorContext = createContext<Context | null>(null);

export const Provider = ({ children }: { children: ReactNode }) => {
    const { id } = useParams();
    const [state, setState] = useState(initialState);

    const game = useQuery({
        queryKey: ['get dungeons'],
        queryFn: () => {
            return getGame(Number(id));
        },
        onSuccess: (data: Required<Game>) => {
            setState(prevState => {
                const dungeon = data.dungeons.find(item => item.id === state.dungeon?.id) || null;
                const monster =
                    dungeon?.monsters.find(item => item.id === state.monster?.id) || null;
                const question =
                    monster?.questions.find(item => item.id === state.question?.id) || null;

                const isCurrentIsBoss = state.monster === state.dungeon?.boss;

                const result = {
                    ...prevState,
                    game: data,
                    dungeon,
                    monster: (isCurrentIsBoss && dungeon?.boss) || monster,
                    question,
                };

                return result;
            });
        },
    });

    const refetchAll = () => game.refetch();

    const onBooleanChange = (data: Record<string, boolean>) => {
        setState(prevState => ({
            ...prevState,
            isGame: false,
            isDungeons: false,
            isMonsters: false,
            isQuestion: false,
            ...data,
        }));
    };

    const onInstancesChange = (data: Record<string, InstanceChangeType>) => {
        setState(prevState => ({
            ...prevState,
            ...data,
        }));

        refetchAll();
    };

    return (
        <CreatorContext.Provider value={{ state, onBooleanChange, onInstancesChange, refetchAll }}>
            {children}
        </CreatorContext.Provider>
    );
};
