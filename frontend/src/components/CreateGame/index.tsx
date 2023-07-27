import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { create } from '@/actions/fetch';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const GAME_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/game/new`;

export const CreateGame = () => {
    const [name, setName] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: () => create(GAME_ADDRESS, { name }),
        onSuccess: data => {
            router.push(`/admin/${data.id}`);
        },
        onError: () => {
            toast({
                title: 'Ошибка',
                description: 'Ошибка при создании игры. Попробуй еще раз!',
            });
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded"
                >
                    Создать игру
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Создание игры</DialogTitle>
                    <DialogDescription>Введите название игры для продолжения</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="name"
                            className="text-right"
                        >
                            Название
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className="col-span-3 rounded"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => mutate()}>Создать</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
