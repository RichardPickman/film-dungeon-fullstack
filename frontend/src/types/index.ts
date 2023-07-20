interface Game {
    id?: number;
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
    monsters: Antagonist[] | [];
    boss: Antagonist;
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

interface Antagonist {
    id: number;
    hp: number;
    name: string;
    image?: string;
    questions: (Question | MultipleQuestion | MapperQuestion)[];
}
