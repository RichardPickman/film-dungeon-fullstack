import Image from 'next/image';
import { HealthBar } from '../HealthBar';

export const CurrentBoss = () => {
    return (
        <div className="relative h-1/2 w-full p-4 -lg overflow-hidden">
            <div className="absolute top-3 left-3 z-10 w-full h-full">
                <HealthBar />
            </div>
            <div className="absolute bg-violet-700  bottom-0 whitespace-nowrap text-center left-0 right-0 z-10 w-full h-8 font-bold">
                Милли Бобби Браун
            </div>
            <Image
                src="/millie.png"
                fill
                alt="current boss"
            />
        </div>
    );
};
