'use client';

import { GameCards } from '@/components/GameCard';
import { CreateGame } from '@/components/CreateGame';
import { useQuery } from '@tanstack/react-query';
import { get } from '@/actions/fetch';

const Page = () => {
    const GAMES_ADDRESS = `${process.env.NEXT_PUBLIC_API_URL}/game`;
    console.log(GAMES_ADDRESS);
    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['games'],
        queryFn: () => get<{}, Required<Game>[]>(GAMES_ADDRESS),
    });

    console.log(data);

    return (
        <div className="flex flex-col w-full h-full max-w-2xl mx-auto m-4 gap-4">
            <div className="flex justify-end items-center">
                <CreateGame />
            </div>
            {data && (
                <GameCards
                    data={data}
                    onDelete={refetch}
                    isSuccess={isSuccess}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default Page;
