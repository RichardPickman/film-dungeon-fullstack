import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { SingleQuestion } from './Questions/SingleQuestion';
import { setState, toggleImage } from '@/store/reducers/creator';
import { Questions } from '@/components/Questions';

export const Question = () => {
    const state = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const question = state.question;
    const monster = state.monster;

    if (!monster) {
        return null;
    }

    if (!question) {
        return null;
    }

    const onPrev = () => {
        if (monster.questions[0] === question) {
            return;
        }

        const prevIndex = monster.questions.findIndex(item => item.id === question.id);

        dispatch(setState({ key: 'question', value: monster.questions[prevIndex - 1] }));
    };

    const onNext = () => {
        if (monster.questions.at(-1) === question) {
            return;
        }

        const nextIndex = monster.questions.findIndex(item => item.id === question.id);

        dispatch(setState({ key: 'question', value: monster.questions[nextIndex + 1] }));
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full p-2 justify-between">
            <Questions
                question={state.question}
                monster={state.monster}
                isImageShowing={state.isImageShowing}
            />
            <div className="flex gap-2 justify-around">
                <Button
                    onClick={onPrev}
                    disabled={monster.questions[0] === question}
                >
                    Предыдущий вопрос
                </Button>
                <Button onClick={() => dispatch(toggleImage())}>
                    {state.isImageShowing ? 'Скрыть картинку' : 'Показать картинку'}
                </Button>
                <Button
                    onClick={onNext}
                    disabled={monster.questions.at(-1) === question}
                >
                    Следующий вопрос
                </Button>
            </div>
        </div>
    );
};
