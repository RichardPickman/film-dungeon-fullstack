import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: '4MB' },
        video: { maxFileSize: '16MB' },
        audio: { maxFileSize: '4MB' },
    })
        .middleware(() => ({}))
        .onUploadComplete(async ({ file }) => {
            console.log('Upload complete');

            console.log('file url', file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
