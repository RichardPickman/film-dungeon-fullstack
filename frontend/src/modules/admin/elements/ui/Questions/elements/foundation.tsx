import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { deleteImage } from '@/services/image';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';
import { useState } from 'react';
import { MapperQuestion, MultipleQuestion, SingleQuestion } from '.';

interface Props {
    monsterId: number;
    type: 'single' | 'multiple' | 'mapper';
    onSave: (data: OneOfQuestions) => void;
}

export const Foundation = ({ onSave, type, monsterId }: Props) => {
    const { toast } = useToast();
    const [image, setImage] = useState<{ fileKey: string; fileUrl: string } | null>(null);
    const [question, setQuestion] = useState('');

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                setImage({ fileKey: '', fileUrl: '' });
            } catch (e) {
                toast({
                    title: 'Ошибка!',
                    description: 'Произошла ошибка при удалении картинки!',
                });
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {image && (
                <div className="relative w-64 h-64  mx-auto">
                    <Image
                        src={image.fileUrl}
                        alt="Картинка вопроса"
                        fill
                    />
                    <ContextMenu>
                        <ContextMenuTrigger className="absolute top-0 left-0 right-0 bottom-0" />
                        <ContextMenuContent>
                            <ContextMenuItem
                                inset
                                onClick={removeImage}
                            >
                                Удалить картинку
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>
            )}
            {!image && (
                <div className="p-4">
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={res => res && setImage(res[0])}
                        onUploadError={() =>
                            toast({
                                title: 'Ошибка!',
                                description: 'Ошибка при сохранении картинки в базу данных!',
                            })
                        }
                    />
                </div>
            )}
            <Textarea
                placeholder="Введите тело вопроса"
                className="w-full"
                onChange={event => setQuestion(event.target.value)}
            />
            {type === 'single' && (
                <SingleQuestion
                    question={question}
                    onSave={() =>
                        onSave({
                            type,
                            question,
                            bossId: monsterId || null,
                            monsterId: monsterId || null,
                            image,
                        })
                    }
                    onRemove={() => removeImage()}
                />
            )}
            {type === 'multiple' && (
                <MultipleQuestion
                    onSave={data =>
                        onSave({
                            ...data,
                            type,
                            question,
                            bossId: monsterId || null,
                            monsterId: monsterId || null,
                            image,
                        })
                    }
                    onRemove={() => removeImage()}
                />
            )}
            {type === 'mapper' && (
                <MapperQuestion
                    onSave={data =>
                        onSave({
                            ...data,
                            type,
                            question,
                            bossId: monsterId || null,
                            monsterId: monsterId || null,
                            image,
                        })
                    }
                    onRemove={() => removeImage()}
                />
            )}
        </div>
    );
};
