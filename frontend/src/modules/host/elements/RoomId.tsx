'use client';

import { Label } from '@/components/ui/label';

const address = process.env.NEXT_PUBLIC_UI_URL + '/game/';

export const RoomId = ({ roomId }: { roomId: string }) => {
    const link = address + roomId;

    return (
        <div className="flex w-full justify-center gap-2 p-2">
            <Label className="flex w-1/2 items-center justify-center whitespace-nowrap p-2 rounded bg-accent overflow-auto">
                {link}
            </Label>
        </div>
    );
};
