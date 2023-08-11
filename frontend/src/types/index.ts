type ImageInfo = {
    fileUrl: string;
    fileKey: string;
};

interface Game {
    id?: number;
    name: string;
    dungeons: Dungeon[];
}

type StrictGame = Required<Game>;

interface GameState {
    sessionId: string | '';
    game: Game | null;
    dungeon: Dungeon | null;
    monster: Monster | null;
    question: OneOfQuestions | null;
    isDungeon: boolean;
    isMonster: boolean;
    isQuestion: boolean;
    monsterHealth: number;
    gameHealth: number;
    isImageShowing: boolean;
}

interface Store extends Game {
    status: string;
    dungeonIndex: number;
    bossIndex: number;
}

interface Dungeon {
    gameId: number;
    id: number;
    name: string;
    image?: ImageInfo;
    monsters: Monster[] | [];
    bossId: number;
    boss: Monster;
}

type OneOfQuestions = MapperQuestion | SingleQuestion | MultipleQuestion;
type QuestionType = 'single' | 'multiple' | 'mapper';
interface Question {
    id?: number;
    image?: ImageInfo | null;
    monsterId: number | null;
    bossId: number | null;
    question: string;
}

interface SingleQuestion extends Question {
    type: 'single';
}

interface MultipleQuestion extends Question {
    type: 'multiple';
    answers: string[];
}

interface MapperQuestion extends Question {
    type: 'mapper';
    letters: string[];
    numbers: string[];
}

interface Monster {
    id: number;
    hp: number;
    name: string;
    image?: ImageInfo;
    dungeonId: number;
    gameId: number;
    questions: OneOfQuestions[];
}
