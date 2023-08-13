import Image from 'next/image';

interface Props {
    monster: Monster | null;
    question: OneOfQuestions | null;
    isImageShowing: boolean;
}

const letters = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'ь',
    'щ',
    'ъ',
    'э',
    'ю',
    'я',
];

export const Questions = ({ monster, question, isImageShowing }: Props) => {
    const questionNumber = monster?.questions.findIndex(item => item.id === question?.id)! + 1;

    console.log(monster);

    return (
        <div className="flex flex-col h-full gap-4 w-full">
            <div className="w-full h-4/6">
                {question && question.image && isImageShowing && (
                    <div className="relative h-full bg-transparent overflow-hidden">
                        <Image
                            className="object-contain"
                            src={question.image?.fileUrl}
                            fill
                            alt="question-image"
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1 text-black text-sm md:text-md lg:text-xl w-full h-2/6 bg-yellow-300 p-4">
                <div className="h-4/12">Вопрос {questionNumber}</div>
                {/* Question text */}
                <div className="h-4/12">{question?.question}</div>
                {/* Question additions */}
                {question?.type === 'multiple' && (
                    <div className="flex flex-col gap-1 items-start h-4/12">
                        {question.answers.map((answer, index) => (
                            <p key={answer + index}>
                                {letters[index]}) {answer}
                            </p>
                        ))}
                    </div>
                )}
                {question?.type === 'mapper' && (
                    <div className="flex gap-4 items-center justify-around h-8/12">
                        <div>
                            {question.letters.map((answer, index) => (
                                <p key={answer + index}>
                                    {letters[index]}) {answer}
                                </p>
                            ))}
                        </div>
                        <div>
                            {question.numbers.map((answer, index) => (
                                <p key={answer + index}>
                                    {index + 1}){answer}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
