import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { updateDungeon } from '@/services/dungeon';
import { deleteImage, getImageKey } from '@/services/image';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { ImageComponent } from '../GameSelectors';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { updateMonster } from '@/services/monster';
import { Checkbox } from '../ui/checkbox';

interface Monster {
    previousData: {
        image?: { fileUrl: string; fileKey: string };
        id: number;
        name: string;
        hp: number;
        boss: boolean;
        dungeonId: number;
    };
    onUpdate: () => void;
}

export const MonsterUpdate = ({ previousData, onUpdate }: Monster) => {
    const [state, setState] = useState<{ hp: number; name: string; boss: boolean }>({
        hp: previousData?.hp,
        name: previousData?.name,
        boss: previousData.boss || false,
    });
    const [image, setImage] = useState<ImageInfo | null>(previousData.image || null);

    const putDungeon = useMutation({
        mutationKey: ['create gungeon'],
        mutationFn: () =>
            updateMonster({
                ...state,
                image: image,
                dungeonId: previousData.dungeonId,
                id: previousData.id,
            }),
        onSuccess: () => {
            onUpdate();
        },
    });

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                await updateMonster({
                    id: previousData.id,
                    image: null,
                    dungeonId: previousData.dungeonId,
                });

                setImage(null);
                onUpdate();
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
            <DialogTrigger asChild>
                <Button variant="outline">Редактировать монстра</Button>
            </DialogTrigger>
            <DialogContent className="rounded sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Редактирование монстра</DialogTitle>
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
                            value={state.name}
                            placeholder="Подземелье..."
                            onChange={event => setState({ ...state, name: event.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center">
                        <Label className="col-span-2">Здоровье</Label>
                        <Input
                            className="col-span-3"
                            type="number"
                            value={state.hp}
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
                            onClick={() => setState({ ...state, boss: !state.boss })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            variant="outline"
                            onClick={() => putDungeon.mutate()}
                        >
                            Обновить
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button variant="outline">Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

interface Dungeon {
    previousData: {
        image?: { fileUrl: string; fileKey: string };
        id: number;
        name: string;
        gameId: number;
    };
    onUpdate: () => void;
}

export const DungeonUpdate = ({ previousData, onUpdate }: Dungeon) => {
    const [name, setName] = useState(previousData.name || '');
    const [image, setImage] = useState<ImageInfo | null>(previousData.image || null);

    const putDungeon = useMutation({
        mutationKey: ['create gungeon'],
        mutationFn: () =>
            updateDungeon({
                name,
                image: image,
                gameId: previousData.gameId,
                id: previousData.id,
            }),
        onSuccess: () => {
            onUpdate();
        },
    });

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                await updateDungeon({
                    id: previousData.id,
                    image: null,
                    gameId: previousData.gameId,
                });

                setImage(null);
                onUpdate();
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
            <DialogTrigger asChild>
                <Button variant="outline">Редактировать подземелье</Button>
            </DialogTrigger>
            <DialogContent className="rounded sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Редактирование</DialogTitle>
                    <DialogDescription>Введите данные о подземельи</DialogDescription>
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
                            value={name}
                            placeholder="Подземелье..."
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            variant="outline"
                            onClick={() => putDungeon.mutate()}
                        >
                            Обновить
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button variant="outline">Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
