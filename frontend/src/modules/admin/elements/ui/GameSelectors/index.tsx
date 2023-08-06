import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createDungeon } from '@/services/dungeon';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { deleteImage } from '@/services/image';
import { toast } from '@/components/ui/use-toast';
import { UploadButton } from '@/utils/uploadthing';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { createMonster } from '@/services/monster';
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
} from '../../../../../components/ui/alert-dialog';
import { Checkbox } from '../../../../../components/ui/checkbox';

interface DungeonProps {
    gameId: number;
    onCreate: () => void;
    previousData?: { image: { fileUrl: string; fileKey: string }; id: number; name: string };
}

export const DungeonCreate = ({ gameId, onCreate }: DungeonProps) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<ImageInfo | null>(null);

    const postDungeon = useMutation({
        mutationKey: ['create gungeon'],
        mutationFn: () => createDungeon({ name, image, gameId }),
        onSuccess: () => {
            setImage({ fileUrl: '', fileKey: '' });
            onCreate();
        },
    });

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                setImage({ fileUrl: '', fileKey: '' });
            } catch (e) {
                toast({
                    title: 'Ошибка!',
                    description: 'Ошибка при удалении картинки!',
                });
            }
        }
    };

    return (
        <Dialog>
            <CreateTrigger />
            <DialogContent className="rounded sm:max-w-[425px] bg-slate-200 dark:bg-black">
                <DialogHeader>
                    <DialogTitle>Добавление подземелья</DialogTitle>
                    <DialogDescription>Введите данные о подземелье</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ImageComponent
                        image={image}
                        onChange={setImage}
                        onRemove={removeImage}
                    />
                    <div className="grid grid-cols-5">
                        <Label className="col-span-2">Название подземелья</Label>
                        <Input
                            className="col-span-3"
                            placeholder="Подземелье..."
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                </div>
                <ItemsFooter
                    onCreate={postDungeon.mutate}
                    onCancel={removeImage}
                />
            </DialogContent>
        </Dialog>
    );
};

interface MonsterProps {
    dungeonId: number;
    onCreate: () => void;
    previousData?: {
        image: { fileUrl: string; fileKey: string };
        id: number;
        name: string;
        hp: number;
    };
}

export const MonsterCreate = ({ dungeonId, onCreate }: MonsterProps) => {
    const [state, setState] = useState<{ hp: number; name: string; boss: boolean }>({
        hp: 0,
        name: '',
        boss: false,
    });
    const [image, setImage] = useState<ImageInfo | null>(null);

    const postMonster = useMutation({
        mutationKey: ['create gungeon'],
        mutationFn: () => createMonster({ ...state, image, dungeonId }),
        onSuccess: () => {
            setState({ hp: 0, name: '', boss: false });
            setImage(null);

            onCreate();
        },
    });

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                setImage(null);
            } catch (e) {
                toast({
                    title: 'Ошибка!',
                    description: 'Ошибка при удалении картинки!',
                });
            }
        }
    };

    return (
        <Dialog>
            <CreateTrigger />
            <DialogContent className="rounded sm:max-w-[425px] bg-slate-200 dark:bg-black">
                <DialogHeader>
                    <DialogTitle>Добавление монстра</DialogTitle>
                    <DialogDescription>Введите данные о монстре</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ImageComponent
                        image={image}
                        onChange={setImage}
                        onRemove={removeImage}
                    />
                    <div className="grid grid-cols-5 items-center">
                        <Label className="col-span-2">Имя монстра</Label>
                        <Input
                            className="col-span-3"
                            placeholder="Подземелье..."
                            onChange={event => setState({ ...state, name: event.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center">
                        <Label className="col-span-2">Здоровье</Label>
                        <Input
                            className="col-span-3"
                            type="number"
                            placeholder="Подземелье..."
                            onChange={event =>
                                setState({ ...state, hp: Number(event.target.value) })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center">
                        <Label
                            htmlFor="boss"
                            className="col-span-2"
                        >
                            Босс
                        </Label>
                        <Checkbox
                            id="boss"
                            checked={state.boss}
                            className="col-span-3"
                            onClick={() => setState({ ...state, boss: !state.boss })}
                        />
                    </div>
                </div>
                <ItemsFooter
                    onCreate={postMonster.mutate}
                    onCancel={removeImage}
                />
            </DialogContent>
        </Dialog>
    );
};

interface ImageProps {
    image?: { fileUrl: string; fileKey: string } | null;
    onChange: (res: ImageInfo) => void;
    onRemove: () => void;
}

export const ImageComponent = ({ image, onChange, onRemove }: ImageProps) =>
    image ? (
        <div className="relative w-64 h-64 rounded overflow-hidden justify-self-center">
            <Image
                src={image.fileUrl}
                alt="Картинка"
                fill
            />

            <AlertDialog>
                <ContextMenu>
                    <ContextMenuTrigger className="absolute top-0 left-0 right-0 bottom-0" />
                    <ContextMenuContent className="w-64">
                        <AlertDialogTrigger asChild>
                            <ContextMenuItem inset>Удалить картинку</ContextMenuItem>
                        </AlertDialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Внимание!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Удаление картинки приведет к ее потере и картинку придется загружать
                            снова, даже при условии отмены редактирования!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={onRemove}>Продолжить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    ) : (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={res => res && onChange(res[0])}
            onUploadError={() =>
                toast({
                    title: 'Ошибка!',
                    description: 'Ошибка при сохранении картинки в базу данных!',
                })
            }
        />
    );

const ItemsFooter = ({ onCreate, onCancel }: { onCreate: () => void; onCancel: () => void }) => (
    <DialogFooter>
        <DialogClose className="flex gap-2">
            <Button
                className="rounded"
                variant="outline"
                onClick={onCreate}
            >
                Сохранить
            </Button>
            <Button
                className="rounded"
                variant="outline"
                onClick={onCancel}
            >
                Отмена
            </Button>
        </DialogClose>
    </DialogFooter>
);

const CreateTrigger = () => (
    <DialogTrigger asChild>
        <div className="w-6/12 relative rounded aspect-square overflow-hidden cursor-pointer border">
            <div className="absolute w-1/3 h-1 rounded top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-slate-700"></div>
            <div className="absolute h-1/3 w-1 rounded top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-slate-700"></div>
        </div>
    </DialogTrigger>
);
