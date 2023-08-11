import { Heart } from '@/assets/icons/heart';
import { ReactNode } from 'react';

export const HealthBar = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex w-fit gap-2 items-center justify-center bg-white rounded p-2">
            <Heart
                size={36}
                color="#DC143C"
            />
            <p className="text-3xl text-red-500 font-bold">{children}</p>
        </div>
    );
};
