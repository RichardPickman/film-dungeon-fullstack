'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    secure: true,
});

export const getSignature = async () => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = cloudinary.config().api_secret;

    if (!apiSecret) {
        return;
    }

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: 'film-dungeon',
        },
        apiSecret
    );

    return { timestamp, signature };
};
