import { UserIcon } from '@/components/Icons/User';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface Props {
    currentItem: Monster | Dungeon | undefined | null;
    isActive?: boolean;
    arr: Monster[] | Dungeon[];
}

export const CardsWithStatus = ({ arr, currentItem }: Props) => {
    if (!currentItem) {
        console.log('Current item not provided for CardsWithStatus');

        return null;
    }

    if (!arr) {
        console.log('Array not provided for CardsWithStatus');

        return null;
    }

    const currentIndex = arr.findIndex(item => item.id === currentItem.id);

    return (
        <div className="flex flex-col w-full h-full gap-2 overflow-auto items-center justify-center">
            {arr.map((item, index) =>
                item.image ? (
                    <div
                        className="relative w-full md:w-10/12 lg:w-8/12 aspect-square overflow-hidden border rounded"
                        key={item.id + item.name}
                    >
                        {currentIndex > index && (
                            <>
                                <Image
                                    className="object-cover opacity-10"
                                    src={item.image.fileUrl}
                                    alt="Картинка карточки"
                                    sizes="(max-width:)"
                                    fill
                                />
                                <Check className="absolute z-10 bottom-0 right-0 w-4 h-4" />
                            </>
                        )}
                        {currentIndex === index && (
                            <Image
                                className="object-cover"
                                src={item.image.fileUrl}
                                alt="Картинка карточки"
                                sizes="(max-width:)"
                                fill
                            />
                        )}
                        {currentIndex < index && (
                            <Image
                                className="object-cover"
                                src={item.image.fileUrl}
                                alt="Картинка карточки"
                                sizes="(max-width:)"
                                fill
                            />
                        )}
                    </div>
                ) : (
                    <div
                        className="relative w-12/12 md:w-10/12 lg:w-8/12 aspect-square overflow-hidden border rounded"
                        key={item.id + item.name}
                    >
                        <div
                            key={item.id + item.name}
                            className="flex w-full h-full items-center justify-center"
                        >
                            <UserIcon className="w-1/2 h-1/2" />
                        </div>
                    </div>
                ),
            )}
        </div>
    );
};
