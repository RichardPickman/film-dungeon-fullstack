import { Skeleton } from '@/components/ui/skeleton';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../../../../../components/ui/accordion';
import Image from 'next/image';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const QuestionsSkeleton = () => {
    return (
        <Accordion
            type="single"
            className="flex flex-col w-full min-w-full"
            collapsible
        >
            <AccordionItem value="skeleton-1">
                <AccordionTrigger>
                    <Skeleton className="w-64 h-4" />
                </AccordionTrigger>
                <AccordionContent>
                    <Skeleton className="ml-6 w-64 h-4" />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skeleton-2">
                <AccordionTrigger>
                    <Skeleton className="w-64 h-4" />
                </AccordionTrigger>
                <AccordionContent>
                    <Skeleton className="ml-6 w-64 h-4" />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skeleton-3">
                <AccordionTrigger>
                    <Skeleton className="w-64 h-4" />
                </AccordionTrigger>
                <AccordionContent>
                    <Skeleton className="ml-6 w-64 h-4" />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

interface Props {
    questions: OneOfQuestions[];
    onDelete: (data: { id: number; image?: ImageInfo | null }) => void;
}

export const QuestionsAccordion = ({ questions, onDelete }: Props) => {
    return (
        <Accordion
            type="single"
            className="flex flex-col w-full"
            collapsible
        >
            {questions.map((question, index) => {
                const type = question.type;

                return (
                    <AccordionItem
                        value={`item-${index + 1}`}
                        key={question.id}
                    >
                        <AccordionTrigger>{question.question}</AccordionTrigger>
                        <AccordionContent>
                            {type === 'single' && (
                                <div className="flex flex-col w-full items-center justify-center gap-4">
                                    {question.image?.type === 'image' && (
                                        <div className="relative aspect-video h-64">
                                            <Image
                                                className="w-full h-full object-cover"
                                                src={question.image.fileUrl}
                                                alt="Картинка вопроса"
                                                fill
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'video' && (
                                        <div className="w-fit h-64">
                                            <video
                                                controls
                                                className="w-fit h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'sound' && (
                                        <div className="w-fit h-12">
                                            <audio
                                                controls
                                                className="w-fit h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    <p className="h-1/3">{question.question}</p>
                                </div>
                            )}
                            {type === 'multiple' && (
                                <div className="flex flex-col w-full items-center gap-4">
                                    {question.image?.type === 'image' && (
                                        <div className="relative aspect-video h-64">
                                            <Image
                                                className="w-full h-full object-cover"
                                                src={question.image.fileUrl}
                                                alt="Картинка вопроса"
                                                fill
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'video' && (
                                        <div className="w-full h-64">
                                            <video
                                                className="w-full h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'sound' && (
                                        <div className="w-full h-12">
                                            <audio
                                                controls
                                                className="w-full h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 items-center">
                                        {question.answers.map((item, index) => (
                                            <p key={item + index}>{item}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {type === 'mapper' && (
                                <div className="flex flex-col w-full items-center gap-4">
                                    {question.image?.type === 'image' && (
                                        <div className="relative aspect-video h-64">
                                            <Image
                                                className="w-full h-full object-cover"
                                                src={question.image.fileUrl}
                                                alt="Картинка вопроса"
                                                fill
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'video' && (
                                        <div className="w-full h-64">
                                            <video
                                                className="w-full h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    {question.image?.type === 'sound' && (
                                        <div className="w-full h-12">
                                            <audio
                                                controls
                                                className="w-full h-full"
                                                src={question.image.fileUrl}
                                            />
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 w-full">
                                        <div className="flex flex-col gap-2 items-center">
                                            {question.letters.map((item, index) => (
                                                <p key={item + index}>{item}</p>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            {question.numbers.map((item, index) => (
                                                <p key={item + index}>{item}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex mt-4 w-full">
                                <AlertDialog>
                                    <AlertDialogTrigger className="flex w-full justify-end">
                                        <Button
                                            variant="default"
                                            className=""
                                        >
                                            Удалить
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Удаление вопроса</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Удаление вопроса приведет к потере всех данных
                                                связанных с вопросом
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogAction
                                            onClick={() =>
                                                onDelete({
                                                    id: question.id!,
                                                    image: question.image,
                                                })
                                            }
                                        >
                                            Подтвердить
                                        </AlertDialogAction>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};
