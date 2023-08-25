import { UserIcon } from '@/components/Icons/User';
import { Check } from 'lucide-react';
import Image from 'next/image';

export const CardWithCheck = ({ item }: { item: Monster | Dungeon }) => {
    return (
        <>
            <Image
                className="object-cover brightness-50"
                src={item.image!.fileUrl}
                alt="Картинка карточки"
                sizes="(max-width:)"
                fill
            />
            <Check className="absolute z-10 bottom-2 right-2 w-6 h-6" />
        </>
    );
};

interface Props {
    items: Dungeon[] | Monster[] | null;
    currentItem: Dungeon | Monster | null;
    onClick?: () => void;
}

export const Cards = ({ items, currentItem, onClick }: Props) => {
    if (!items) {
        console.log('No items providede');

        return null;
    }

    const currentIndex = items.findIndex(
        dung => dung.id === currentItem?.id && dung.name === currentItem.name,
    );

    const getCard = (card: Monster | Dungeon, index: number) => {
        if (!card.image) {
            return (
                <div
                    className="relative w-10/12 md:w-8/12 lg:w-6/12 aspect-square overflow-hidden rounded"
                    onClick={onClick}
                >
                    <UserIcon className="w-1/2 h-1/2" />
                </div>
            );
        }

        if (currentIndex > index) {
            return (
                <div
                    className="relative w-10/12 md:w-8/12 lg:w-6/12 aspect-square overflow-hidden rounded"
                    onClick={onClick}
                >
                    <CardWithCheck item={card} />
                </div>
            );
        }

        if (currentIndex === index) {
            return (
                <div
                    className="relative w-10/12 md:w-8/12 lg:w-6/12 aspect-square overflow-hidden rounded"
                    onClick={onClick}
                >
                    <Image
                        className="object-cover"
                        src={card.image.fileUrl}
                        alt="Картинка карточки"
                        sizes="(max-width:)"
                        fill
                    />
                </div>
            );
        }

        if (currentIndex < index) {
            return (
                <div
                    className="relative w-10/12 md:w-8/12 lg:w-6/12 aspect-square overflow-hidden rounded"
                    onClick={onClick}
                >
                    <Image
                        className="object-cover brightness-50"
                        src={card.image.fileUrl}
                        alt="Картинка карточки"
                        sizes="(max-width:)"
                        fill
                    />
                </div>
            );
        }
    };

    return items.map(getCard);
};
