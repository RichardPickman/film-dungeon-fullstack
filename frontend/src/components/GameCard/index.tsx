import Link from 'next/link';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { remove } from '@/actions/fetch';
import { GameCardSkeleton } from './GameCardSkeleton';
import { Label } from '../ui/label';
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
} from '../ui/alert-dialog';
import { useToast } from '../ui/use-toast';

const GAMES_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/game`;

interface Props {
    data: Required<Game>[] | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    onDelete: () => void;
}

export const GameCards = ({ isLoading, isSuccess, data, onDelete }: Props) => {
    const { toast } = useToast();
    const mutation = useMutation({
        mutationKey: ['delete game'],
        mutationFn: (id: number) => remove(`${GAMES_ADDRESS}/${id}`),
        onSuccess: onDelete,
        onError: () => {
            toast({
                title: 'Ошибка!',
                description: 'Ошибка при удалении игры',
            });
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <GameCardSkeleton />
                <GameCardSkeleton />
                <GameCardSkeleton />
                <GameCardSkeleton />
                <GameCardSkeleton />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center">
                <Label>Ошибка при запросе игр</Label>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4">
                {data.map(game => (
                    <div
                        key={game.id}
                        className="flex p-4 border justify-between items-center rounded"
                    >
                        <p>{game.name}</p>
                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Удалить</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Удаление игры приведет к потере всех данных о игре
                                            включая картинки
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => mutation.mutate(game.id)}>
                                            Продолжить
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Link href={`/admin/${game.id}`}>
                                <Button
                                    className="rounded"
                                    variant="outline"
                                >
                                    Редактировать
                                </Button>
                            </Link>
                            <Link href={`/host/${game.id}`}>
                                <Button
                                    className="rounded"
                                    variant="outline"
                                >
                                    Играть
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};
