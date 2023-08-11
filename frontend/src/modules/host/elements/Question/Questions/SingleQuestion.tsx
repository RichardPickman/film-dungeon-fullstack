import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface Props {
    question: OneOfQuestions;
    isImage: boolean;
}

export const SingleQuestion = ({ question, isImage }: Props) => {
    return (
        <div className="flex flex-col gap-4 w-full h-full justify-between">
            <div className="aspect-video max-h-2/3">
                {isImage && (
                    <div className="relative w-full h-full aspect-video">
                        {question.image && question.image?.fileUrl && (
                            <Image
                                src={question.image?.fileUrl!}
                                alt={'picture'}
                                fill
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col border rounded p-4">
                <Label>{question.question}</Label>
            </div>
        </div>
    );
};
