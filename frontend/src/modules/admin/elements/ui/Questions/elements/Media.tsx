import Image from 'next/image';

interface Props {
    image: ImageInfo;
}

export const Media = ({ image }: Props) => {
    if (image.type === 'image') {
        return (
            <div className="relative w-64 h-64">
                <Image
                    className="w-full h-full object-cover"
                    src={image.fileUrl}
                    alt="Картинка вопроса"
                    fill
                />
            </div>
        );
    }
    if (image.type === 'video') {
        return (
            <div className="w-full h-64">
                <video
                    className="w-full h-full"
                    src={image.fileUrl}
                />
            </div>
        );
    }
    if (image.type === 'sound') {
        return (
            <div className="w-full h-12">
                <audio
                    controls
                    className="w-full h-full"
                    src={image.fileUrl}
                />
            </div>
        );
    }
};
