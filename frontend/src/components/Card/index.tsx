import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { UserIcon } from '../Icons/User';
import { cn } from '@/lib/utils';

interface Props {
    image?: ImageInfo;
    isActive?: boolean;
    onClick: () => void;
}

export const Card = ({ image, onClick, isActive }: Props) => (
    <div
        className="relative w-12/12 md:w-10/12 lg:w-8/12 aspect-square cursor-pointer overflow-hidden border rounded"
        onClick={onClick}
    >
        {!image && (
            <div className="flex w-full h-full items-center justify-center">
                <UserIcon className="w-6/12 h-6/12" />
            </div>
        )}
        {image && (
            <Image
                className={cn('object-cover', isActive ? 'brightness-100' : 'brightness-50')}
                src={image.fileUrl}
                fill
                alt="Картинка карточки"
                sizes="(max-width: )"
            />
        )}
    </div>
);

export const CardSkeleton = () => {
    return (
        <div className="relative w-6/12 aspect-square ">
            <Skeleton className="w-full h-full" />
        </div>
    );
};
