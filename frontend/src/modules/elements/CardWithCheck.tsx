import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

export const CardWithCheck = ({
    item,
    isActive,
    onClick,
}: {
    item: Monster | Dungeon;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className="relative w-12/12 md:w-10/12 lg:w-8/12 aspect-square cursor-pointer overflow-hidden border rounded"
            onClick={onClick}
        >
            <Image
                className={cn('object-cover', isActive ? 'brightness-100' : 'brightness-50')}
                src={item.image!.fileUrl}
                alt="Картинка карточки"
                sizes="(max-width:)"
                fill
            />
            {!isActive && <Check className="absolute z-10 bottom-2 right-2 w-6 h-6" />}
        </div>
    );
};
