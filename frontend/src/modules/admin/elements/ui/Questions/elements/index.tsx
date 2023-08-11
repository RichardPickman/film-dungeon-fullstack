import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

interface MultipleProps {
    onSave: (answers: { answers: string[] }) => void;
    onRemove: () => void;
}

export const SingleQuestion = ({
    question,
    onSave,
    onRemove,
}: {
    question: string;
    onSave: () => void;
    onRemove: () => void;
}) => {
    return (
        <DialogFooter>
            <DialogClose>
                <Button
                    variant="default"
                    disabled={!question}
                    onClick={() => onSave()}
                >
                    Сохранить
                </Button>
            </DialogClose>
            <DialogClose>
                <Button
                    variant="default"
                    onClick={onRemove}
                >
                    Отмена
                </Button>
            </DialogClose>
        </DialogFooter>
    );
};

export const MultipleQuestion = ({ onSave, onRemove }: MultipleProps) => {
    const [answers, setAnswers] = useState<{ id: number; text: string }[]>([]);

    const _onSave = () => onSave({ answers: answers.map(item => item.text) });

    const addAnswer = () => setAnswers([...answers, { id: Date.now(), text: '' }]);

    const removeAnswer = (id: number) => setAnswers(answers.filter(item => item.id !== id));

    const updateAnswer = (id: number, text: string) => {
        const itemIndex = answers.findIndex(item => item.id === id);
        const mutateArr = [...answers];

        mutateArr[itemIndex] = { id, text };

        setAnswers(mutateArr);
    };

    return (
        <>
            <div className="grid grid-flow-row gap-2">
                {answers.map(item => (
                    <div
                        className="grid grid-cols-5 gap-1"
                        key={item.id}
                    >
                        <Input
                            className="col-span-4 "
                            value={item.text}
                            onChange={event => updateAnswer(item.id, event.target.value)}
                        />
                        <Button
                            className="col-span-1 "
                            variant="default"
                            onClick={() => removeAnswer(item.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                ))}
                <Button
                    variant="default"
                    onClick={() => addAnswer()}
                >
                    Добавить вариант ответа
                </Button>
            </div>
            <DialogFooter>
                <DialogClose>
                    <Button
                        variant="default"
                        disabled={answers.length === 0}
                        onClick={() => _onSave()}
                    >
                        Сохранить
                    </Button>
                </DialogClose>
                <DialogClose>
                    <Button
                        variant="default"
                        onClick={onRemove}
                    >
                        Отмена
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
};

interface MapperProps {
    onSave: (data: { letters: string[]; numbers: string[] }) => void;
    onRemove: () => void;
}

export const MapperQuestion = ({ onSave, onRemove }: MapperProps) => {
    const [mapper, setMapper] = useState<{ id: number; letter: string; number: string }[]>([]);

    const addMapper = () => setMapper([...mapper, { id: Date.now(), letter: '', number: '' }]);

    const removeMapper = (id: number) => setMapper(mapper.filter(item => item.id !== id));

    const updateMapper = (id: number, letter: string, number: string) => {
        const itemIndex = mapper.findIndex(item => item.id === id);
        const mutateArr = [...mapper];

        mutateArr[itemIndex] = { id, letter, number };

        setMapper(mutateArr);
    };

    const _onSave = () => {
        const parsedLetters = mapper.reduce(
            (acc, item) => {
                return {
                    letters: [...acc.letters, item.letter],
                    numbers: [...acc.numbers, item.number],
                };
            },
            { letters: [] as string[], numbers: [] as string[] },
        );

        onSave({
            letters: parsedLetters.letters,
            numbers: parsedLetters.numbers,
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-flow-row gap-2">
                {mapper.map(item => (
                    <div
                        className="flex gap-1"
                        key={item.id + 'letter'}
                    >
                        <Input
                            className="col-span-2 "
                            value={item.letter}
                            onChange={event =>
                                updateMapper(item.id, event.target.value, item.number)
                            }
                        />
                        <Input
                            className="col-span-2 "
                            value={item.number}
                            key={item.id + 'number'}
                            onChange={event =>
                                updateMapper(item.id, item.letter, event.target.value)
                            }
                        />
                        <Button
                            className="col-span-1 "
                            variant="default"
                            onClick={() => removeMapper(item.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                ))}
                <Button
                    variant="default"
                    onClick={() => addMapper()}
                >
                    Добавить варианты ответов
                </Button>
            </div>
            <DialogFooter>
                <DialogClose>
                    <Button
                        variant="default"
                        disabled={mapper.length === 0}
                        onClick={() => _onSave()}
                    >
                        Сохранить
                    </Button>
                </DialogClose>
                <DialogClose>
                    <Button
                        variant="default"
                        onClick={onRemove}
                    >
                        Отмена
                    </Button>
                </DialogClose>
            </DialogFooter>
        </div>
    );
};
