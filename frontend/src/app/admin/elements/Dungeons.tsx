'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from '@/components/Card';
import { RootState } from '@/store';
import { addDungeon } from '@/store/reducers/creator';
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { getSignature } from '@/actions';

export const Dungeons = () => {
    const { dungeons } = useSelector((state: RootState) => state.creator);
    const dispatch = useDispatch();

    const [dungeonIndex, setDungeonIndex] = useState(0);
    const [currentDungeon, setCurrentDungeon] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState<File | null>(null);

    const onSubmit = async () => {
        if (file) {
            const result = await action();

            dispatch(
                addDungeon({
                    id: dungeons.length + 1,
                    monsters: [],
                    boss: {},
                    image: result.url,
                })
            );
        }
    };

    async function action() {
        const signature = await getSignature();
        const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
        const formData = new FormData();

        if (!url || !file || !apiKey || !signature) {
            return;
        }

        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('signature', signature.signature);
        formData.append('timestamp', String(signature.timestamp));
        formData.append('folder', 'film-dungeon');

        const data = await fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json());

        return data;
    }

    return (
        <div className="flex flex-nowrap w-full h-32 gap-2 justify-center">
            {dungeons.map(item => (
                <Card
                    key={item.id}
                    image={item.image}
                />
            ))}
            {dungeonIndex < 4 && (
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex items-center justify-center aspect-square rounded-lg overflow-hidden border bg-slate-800">
                            <Plus
                                size={48}
                                color="#AAA"
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-500">
                        <DialogHeader>
                            <DialogTitle>Добавить подземелье</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="name"
                                    className="text-right"
                                >
                                    Пикча
                                </Label>
                                <Input
                                    id="name"
                                    type="file"
                                    onChange={event =>
                                        setFile(event.target.files ? event.target.files[0] : null)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                type="submit"
                                onClick={onSubmit}
                            >
                                Добавить
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
