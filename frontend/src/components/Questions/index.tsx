import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { deleteQuestion, getQuestions, saveQuestion } from '@/services/question';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Foundation } from './elements/foundation';
import { toast } from '../ui/use-toast';
import { QuestionsAccordion, QuestionsSkeleton } from './elements/questions';

interface Props {
    monsterId: number;
}

export const Questions = ({ monsterId }: Props) => {
    const questions = useQuery({
        queryKey: ['questions', monsterId],
        queryFn: () => getQuestions(monsterId),
    });

    const [type, setType] = useState<'single' | 'multiple' | 'mapper'>('single');

    const save = useMutation({
        mutationKey: ['save game'],
        mutationFn: (data: OneOfQuestions) => saveQuestion(data),
        onSuccess: () => {
            questions.refetch();

            toast({
                title: 'Успех!',
                description: 'Вопрос успешно сохранен!',
            });
        },
        onError: () => {
            toast({
                title: 'Ошибка!',
                description: 'Произошла ошибка при сохранении вопроса!',
            });
        },
    });

    const remove = useMutation({
        mutationKey: ['remove game'],
        mutationFn: (data: { id: number; image?: ImageInfo | null }) => deleteQuestion(data),
        onSuccess: () => {
            questions.refetch();

            toast({
                title: 'Успех!',
                description: 'Вопрос успешно удален!',
            });
        },
        onError: () => {
            toast({
                title: 'Ошибка!',
                description: 'Произошла ошибка при удалении вопроса!',
            });
        },
    });

    return (
        <div className="flex flex-col w-full items-center justify-center gap-4">
            {questions.isLoading && <QuestionsSkeleton />}

            {questions.data && (
                <QuestionsAccordion
                    questions={questions.data}
                    onDelete={data => remove.mutate(data)}
                />
            )}

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Добавить вопрос</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавление вопроса</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <Select onValueChange={(value: QuestionType) => setType(value)}>
                            <SelectTrigger className="rounded">
                                <SelectValue
                                    className="p-2 rounded"
                                    placeholder="Выбери тип вопроса"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="rounded bg-slate-200 dark:bg-black">
                                    <SelectLabel>Вопросы</SelectLabel>
                                    <SelectItem
                                        className="hover:cursor-pointer"
                                        value="single"
                                        defaultChecked
                                    >
                                        Вопрос одним текстом
                                    </SelectItem>
                                    <SelectItem
                                        className="hover:cursor-pointer"
                                        value="multiple"
                                    >
                                        Вопрос с выбором букв
                                    </SelectItem>
                                    <SelectItem
                                        className="hover:cursor-pointer"
                                        value="mapper"
                                    >
                                        Вопрос с выбором букв и цифр
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {type && (
                            <Foundation
                                monsterId={monsterId}
                                type={type}
                                onSave={data => save.mutate(data)}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
