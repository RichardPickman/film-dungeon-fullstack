interface Game {
    id?: number;
    name: string;
    dungeons: Dungeon[] | [];
}

interface Store extends Game {
    status: string;
    dungeonIndex: number;
    bossIndex: number;
}

interface Dungeon {
    id: number;
    image?: string;
    monsters: Monster[] | [];
    boss: Monster;
}

interface Question {
    type: 'single' | 'multiple' | 'mapper';
    question: string;
    image?: string;
}

interface MultipleQuestion extends Question {
    answers: string[];
}

interface MapperQuestion extends Question {
    letters: string[];
    numbers: string[];
}

interface Monster {
    id: number;
    hp: number;
    name: string;
    image?: string;
    questions: (Question | MultipleQuestion | MapperQuestion)[];
}
