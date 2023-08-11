import { Header } from '@/modules/admin/elements/Header';
import { Card } from '@/components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setBoolean, setNumber, setState } from '@/store/reducers/creator';
import { Button } from '@/components/ui/button';
import { LeaveIcon } from '@/components/Icons/Leave';
import { Label } from '@/components/ui/label';
import { RootState } from '@/store';
import { cn } from '@/lib/utils';

export const RightMenu = () => {
    const state = useSelector((state: RootState) => state.session);

    if (!state.game) {
        return null;
    }

    return (
        <div className="flex flex-col border-l w-full h-full items-center">
            {state.isDungeon && <Dungeons />}
            {state.isMonster && <Monsters />}
            {state.isQuestion && <Questions />}
        </div>
    );
};

export const Dungeons = () => {
    const state = useSelector((state: RootState) => state.session);
    const dungeons = state.game?.dungeons || null;
    const dispatch = useDispatch();

    if (!dungeons) {
        return null;
    }

    const onClick = (dungeon: Dungeon) => {
        dispatch(setState({ key: 'dungeon', value: dungeon }));
        dispatch(setBoolean({ key: 'isMonster', value: true }));
    };

    return (
        <div className="flex flex-col gap-2 w-full h-full items-center">
            <div className="flex items-center justify-center w-full p-2 border-b">Подземелья</div>
            <div className="flex flex-col w-full h-full overflow-auto items-center">
                {dungeons.map(dungeon => (
                    <Card
                        key={dungeon.id + dungeon.name}
                        onClick={() => onClick(dungeon)}
                        image={dungeon.image}
                        isActive={false}
                    />
                ))}
            </div>
        </div>
    );
};

export const Monsters = () => {
    const state = useSelector((state: RootState) => state.session);
    const monsters = state.dungeon?.monsters || null;
    const dispatch = useDispatch();
    const boss = state.dungeon?.boss || null;

    if (!monsters) {
        return null;
    }

    const onClick = (monster: Monster) => {
        dispatch(setState({ key: 'monster', value: monster }));
        dispatch(setBoolean({ key: 'isQuestion', value: true }));
    };

    const onLeave = () => {
        dispatch(setBoolean({ key: 'isDungeon', value: true }));
    };

    return (
        <div className="flex flex-col gap-2 w-full h-full items-center justify-between">
            <div className="flex items-center justify-center w-full p-2 border-b">Монстры</div>
            <div className="flex flex-col w-full h-full overflow-auto gap-2 items-center">
                {monsters.map(monster => (
                    <Card
                        key={monster.id + monster.name}
                        onClick={() => onClick(monster)}
                        image={monster.image}
                        isActive={false}
                    />
                ))}
                {boss && (
                    <Card
                        key={boss.id + boss.name}
                        onClick={() => onClick(boss)}
                        image={boss.image}
                        isActive={false}
                    />
                )}
            </div>
            <div className="w-full border-t p-2">
                <Button
                    className="w-full"
                    onClick={onLeave}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export const Questions = () => {
    const state = useSelector((state: RootState) => state.session);
    const questions = state.monster?.questions || null;
    const dispatch = useDispatch();

    if (!questions) {
        return null;
    }

    const onClick = (question: OneOfQuestions) => {
        dispatch(setState({ key: 'question', value: question }));
    };

    const onLeave = () => {
        dispatch(setState({ key: 'question', value: null }));
        dispatch(setState({ key: 'monster', value: null }));
        dispatch(setBoolean({ key: 'isMonster', value: true }));
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-between">
            <div className="flex items-center justify-center w-full p-2 border-b">Вопросы</div>
            <div className="flex flex-col w-full h-full overflow-auto gap-2 p-2 items-center ">
                {questions.map(question => (
                    <Label
                        key={question.id + question.question}
                        className={cn(
                            'cursor-pointer p-2 w-full',
                            state.question === question && 'border',
                        )}
                        onClick={() => onClick(question)}
                    >
                        {question.question}
                    </Label>
                ))}
            </div>
            <div className="w-full border-t p-2">
                <Button
                    className="w-full"
                    onClick={onLeave}
                >
                    <LeaveIcon className="mr-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
