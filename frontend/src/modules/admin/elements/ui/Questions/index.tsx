import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../../../../../components/ui/select';
import { deleteQuestion, getQuestions, saveQuestion } from '@/services/question';
import { useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Button } from '../../../../../components/ui/button';
import { Foundation } from './elements/foundation';
import { toast } from '../../../../../components/ui/use-toast';
import { QuestionsAccordion, QuestionsSkeleton } from './elements/questions';
import { CreatorContext } from '@/modules/admin/context';

export const Questions = () => {
    const context = useContext(CreatorContext);
    const boss = context?.state.dungeon?.boss;
    const monster = context?.state.monster;
    const isBoss = boss?.id === monster?.id && boss?.name === monster?.name;
    const questions = useQuery({
        queryKey: ['questions'],
        queryFn: () => {
            if (context?.state.monster?.id) {
                return getQuestions(context?.state.monster?.id);
            }

            return null;
        },
    });

    console.log(isBoss, monster);

    const [type, setType] = useState<'single' | 'multiple' | 'mapper'>('single');

    const save = useMutation({
        mutationKey: ['save game'],
        mutationFn: (data: OneOfQuestions) =>
            saveQuestion({
                ...data,
                bossId: isBoss ? monster?.id! : null,
                monsterId: !isBoss ? monster?.id! : null,
            }),
        onSuccess: () => {
            context?.refetchAll();

            toast({
                title: 'Успех!',
                description: 'Вопрос успешно сохранен!',
            });
        },
        onError: () => {
            context?.refetchAll();

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
            context?.refetchAll();

            toast({
                title: 'Успех!',
                description: 'Вопрос успешно удален!',
            });
        },
        onError: () => {
            context?.refetchAll();
            toast({
                title: 'Ошибка!',
                description: 'Произошла ошибка при удалении вопроса!',
            });
        },
    });

    if (!context?.state.monster?.questions) {
        console.log('There is no questions');
    }

    if (!context?.state.monster?.id) {
        console.log('There is not enough information about a current monster');
    }

    if (!context?.state.monster) {
        console.log('There is no monster yet');

        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center gap-4">
            {questions.isLoading && <QuestionsSkeleton />}

            {context?.state.monster?.questions && (
                <QuestionsAccordion
                    questions={context.state.monster.questions}
                    onDelete={data => remove.mutate(data)}
                />
            )}

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Добавить вопрос</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавление вопроса</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <Select onValueChange={(value: QuestionType) => setType(value)}>
                            <SelectTrigger className="">
                                <SelectValue
                                    className="p-2 "
                                    placeholder="Выбери тип вопроса"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="">
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
                        {context?.state.monster?.id && type && (
                            <Foundation
                                key={context?.state.monster?.id + context?.state.dungeon?.id!}
                                monsterId={context?.state.monster?.id}
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
