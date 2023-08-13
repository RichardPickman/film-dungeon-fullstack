import { NextRequest, NextResponse } from 'next/server';
import { utapi } from 'uploadthing/server';

export const GET = async (req: NextRequest) => {
    const params = new URL(req.url).searchParams;
    const imageKey = params.get('imageKey');

    if (!imageKey) {
        return NextResponse.json({});
    }

    const result = await utapi.getFileUrls(String(imageKey));

    return NextResponse.json(result);
};

export const DELETE = async (req: NextRequest) => {
    const params = new URL(req.url).searchParams;
    const url = params.get('imageKey');
    const imageKey = url?.split('/').at(-1);

    if (!imageKey) {
        return NextResponse.json({});
    }

    await utapi
        .deleteFiles(imageKey)
        .then(res =>
            res.success
                ? 'Image successfully removed!'
                : 'Error occured while deleting image from image server',
        );

    return NextResponse.json({ success: true });
};
