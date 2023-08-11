import { useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { updateDungeon } from '@/services/dungeon';
import { deleteImage } from '@/services/image';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ImageComponent } from '../GameSelectors';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import {
    createBoss,
    createMonster,
    deleteBoss,
    deleteMonster,
    updateBoss,
    updateMonster,
    updateQuestionRelation,
} from '@/services/monster';
import { Checkbox } from '@/components/ui/checkbox';
import { CreatorContext } from '@/modules/admin/context';

export const MonsterUpdate = () => {
    const context = useContext(CreatorContext);
    const monster = context?.state.monster;
    const boss = context?.state.dungeon?.boss;
    const isBoss = boss?.id === monster?.id && boss?.name === monster?.name;

    const [state, setState] = useState<{ hp: number; name: string; boss: boolean }>({
        hp: monster?.hp || 0,
        name: monster?.name || '',
        boss: isBoss || false,
    });
    const [image, setImage] = useState<ImageInfo | null>(monster?.image || null);

    const putDungeon = useMutation({
        mutationKey: ['create gungeon'],
        mutationFn: () => {
            if (isBoss && state.boss) {
                return updateBoss({ id: boss?.id!, ...state, image });
            }

            if (!isBoss && state.boss) {
                deleteMonster({ ...(monster as Monster), image: undefined, id: monster?.id! });

                return createBoss({ ...state, image, dungeonId: context?.state.dungeon?.id! });
            }

            if (isBoss && !state.boss) {
                deleteBoss({ ...monster, image: undefined });

                return createMonster({ ...state, image, dungeonId: context?.state.dungeon?.id! });
            }

            return updateMonster({
                ...state,
                image,
                id: monster?.id!,
                dungeonId: context?.state.dungeon?.id!,
            });
        },
        onSuccess: data => {
            console.log('State saved: ', data);
            const localMonster = data as Monster;

            if (isBoss && !state.boss) {
                console.log(
                    'Invoke boss to monster mutation: ',
                    'boss-to-monster',
                    localMonster.id!,
                    context?.state.monster?.questions as OneOfQuestions[] | [],
                );

                updateQuestionRelation(
                    'boss-to-monster',
                    localMonster.id!,
                    context?.state.monster?.questions as OneOfQuestions[] | [],
                );
            }

            if (!isBoss && state.boss) {
                console.log(
                    'Invoke monster to boss mutation: ',
                    'monster-to-boss',
                    localMonster.id!,
                    context?.state.monster?.questions as OneOfQuestions[] | [],
                );

                updateQuestionRelation(
                    'monster-to-boss',
                    localMonster.id!,
                    context?.state.monster?.questions as OneOfQuestions[] | [],
                );
            }

            context?.refetchAll();
        },
    });

    const removeImage = async () => {
        if (image) {
            try {
                await deleteImage(image);

                if (isBoss) {
                    await updateBoss({
                        id: monster?.id!,
                        image: null,
                        dungeonId: monster?.dungeonId,
                    });
                }

                if (!isBoss) {
                    await updateMonster({
                        id: monster?.id!,
                        image: null,
                        dungeonId: monster?.dungeonId,
                    });
                }

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
            <DialogTrigger asChild>
                <Button>Редактировать монстра</Button>
            </DialogTrigger>
            <DialogContent className=" sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Редактирование монстра</DialogTitle>
                    <DialogDescription>Введите данные о монстре</DialogDescription>
                </DialogHeader>
                <div
                    className="grid gap-4 py-4"
                    key={monster?.id! + monster?.name!}
                >
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
                            disabled={!isBoss && Boolean(context?.state.dungeon?.boss)}
                            checked={state.boss}
                            onClick={() => setState({ ...state, boss: !state.boss })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            variant="default"
                            onClick={() => putDungeon.mutate()}
                        >
                            Обновить
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button variant="default">Закрыть</Button>
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
}

export const DungeonUpdate = ({ previousData }: Dungeon) => {
    const context = useContext(CreatorContext);
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
            context?.refetchAll();
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
                <Button>Редактировать подземелье</Button>
            </DialogTrigger>
            <DialogContent className=" sm:max-w-[425px]">
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
                        <Button onClick={() => putDungeon.mutate()}>Обновить</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button>Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
