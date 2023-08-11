import { Skeleton } from '../ui/skeleton';

export const GameCardSkeleton = () => {
    return (
        <div className="flex p-4 border justify-between items-center ">
            <Skeleton className="h-6 w-[250px]" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-20" />
            </div>
        </div>
    );
};
