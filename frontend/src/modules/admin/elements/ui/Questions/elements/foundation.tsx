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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Props {
    monsterId: number;
    type: 'single' | 'multiple' | 'mapper';
    onSave: (data: OneOfQuestions) => void;
}

export const Foundation = ({ onSave, type, monsterId }: Props) => {
    const { toast } = useToast();
    const [fileType, setFileType] = useState<'image' | 'video' | 'sound'>('image');
    const [image, setImage] = useState<{
        fileKey: string;
        fileUrl: string;
    } | null>(null);
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
            <Select onValueChange={(value: 'image' | 'video' | 'sound') => setFileType(value)}>
                <SelectTrigger className="">
                    <SelectValue
                        className="p-2 "
                        placeholder="Выбери тип файла"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="">
                        <SelectItem
                            className="hover:cursor-pointer"
                            value="image"
                            defaultChecked
                        >
                            Картинка
                        </SelectItem>
                        <SelectItem
                            className="hover:cursor-pointer"
                            value="video"
                        >
                            Видео
                        </SelectItem>
                        <SelectItem
                            className="hover:cursor-pointer"
                            value="sound"
                        >
                            Аудиофайл
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {image && fileType === 'image' && (
                <div className="relative aspect-video h-64 mx-auto">
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
            {image && fileType === 'video' && (
                <div className="w-full h-auto mx-auto">
                    <video
                        className="w-full h-auto"
                        controls
                        src={image.fileUrl}
                    >
                        <ContextMenu>
                            <ContextMenuTrigger className="absolute top-0 left-0 right-0 bottom-0" />
                            <ContextMenuContent>
                                <ContextMenuItem
                                    inset
                                    onClick={removeImage}
                                >
                                    Удалить видео
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </video>
                </div>
            )}
            {image && fileType === 'sound' && (
                <div className="w-full h-12">
                    <audio
                        controls
                        className="w-full h-full"
                        src={image.fileUrl}
                    >
                        <ContextMenu>
                            <ContextMenuTrigger className="absolute top-0 left-0 right-0 bottom-0" />
                            <ContextMenuContent>
                                <ContextMenuItem
                                    inset
                                    onClick={removeImage}
                                >
                                    Удалить аудио
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </audio>
                </div>
            )}
            {!image && (
                <div className="p-4">
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={res =>
                            res &&
                            setImage({
                                fileKey: res[0].key,
                                fileUrl: res[0].url,
                            })
                        }
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
                            bossId: null,
                            monsterId: null,
                            image: image ? { ...image, type: fileType } : null,
                        })
                    }
                    onRemove={removeImage}
                />
            )}
            {type === 'multiple' && (
                <MultipleQuestion
                    onSave={data =>
                        onSave({
                            ...data,
                            type,
                            question,
                            bossId: null,
                            monsterId: null,
                            image: image ? { ...image, type: fileType } : null,
                        })
                    }
                    onRemove={removeImage}
                />
            )}
            {type === 'mapper' && (
                <MapperQuestion
                    onSave={data =>
                        onSave({
                            ...data,
                            type,
                            question,
                            bossId: null,
                            monsterId: null,
                            image: image ? { ...image, type: fileType } : null,
                        })
                    }
                    onRemove={removeImage}
                />
            )}
        </div>
    );
};
