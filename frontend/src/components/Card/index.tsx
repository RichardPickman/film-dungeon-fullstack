import Image from 'next/image';

interface Props {
    image?: string;
}

export const Card = ({ image = '' }: Props) => {
    return (
        <div className="flex justify-center items-centerrounded-lg aspect-square">
            <div className="relative aspect-square rounded-lg overflow-hidden border bg-slate-800">
                <Image
                    className="object-cover"
                    src={image || '/sadie.png'}
                    fill
                    alt="sadie"
                />
            </div>
        </div>
    );
};
