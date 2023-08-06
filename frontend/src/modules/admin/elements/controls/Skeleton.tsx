import { CardSkeleton } from '@/components/Card';
import { Skeleton } from '@/components/ui/skeleton';

export const ControlsSkeleton = () => {
    return (
        <div className="flex flex-col h-full group relative items-center gap-4">
            <div className="w-full p-4 border-b">
                <Skeleton className="w-full h-4" />
            </div>
            <div className="w-full h-full flex flex-col items-center gap-4">
                <div className="contents">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
            <div className="flex flex-col w-full p-4">
                <Skeleton className="w-full h-8" />
            </div>
        </div>
    );
};
