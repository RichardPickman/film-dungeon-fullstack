'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const address = process.env.NEXT_PUBLIC_UI_URL + '/game/';

export const RoomId = ({ roomId }: { roomId: string }) => {
    const link = address + roomId;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);

        toast({
            title: 'Address copied to clipboard',
        });
    };

    return (
        <div className="flex w-1/2 justify-center gap-2 p-2">
            <Label className="flex w-1/2 items-center justify-start whitespace-nowrap p-2 rounded bg-accent overflow-auto">
                {link}
            </Label>
            <Button
                className="w-fit whitespace-nowrap"
                onClick={copyToClipboard}
            >
                Скопировать
            </Button>
        </div>
    );
};
