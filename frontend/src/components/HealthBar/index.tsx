import { Heart } from '@/assets/icons/heart';

export const HealthBar = () => {
    return (
        <div className="flex items-center justify-around w-4/12 bg-white rounded p-2">
            <Heart
                size={36}
                color="#DC143C"
            />
            <p className="text-3xl text-red-500 font-bold">12</p>
        </div>
    );
};
