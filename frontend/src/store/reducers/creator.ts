import { createSlice } from '@reduxjs/toolkit';

interface NumberedStateMap {
    key:
        | 'currentDungeonId'
        | 'currentMonsterId'
        | 'currentQuestionId'
        | 'monsterHealth'
        | 'gameHealth';
    value: number | null;
}

interface BooleanStateMap {
    key: 'isDungeon' | 'isMonster' | 'isQuestion' | 'isPaused' | 'isUiHidden';
    value: boolean | null;
}

interface ActionNumbered {
    type: string;
    payload: NumberedStateMap;
}

interface ActionStates {
    type: string;
    payload: {
        key: 'dungeon' | 'monster' | 'question';
        value: Dungeon | Monster | Question | null;
    };
}

interface SetGameType {
    type: string;
    payload: GameState;
}

const initialState: GameState = {
    sessionId: '',
    game: null,
    dungeon: null,
    monster: null,
    question: null,
    isDungeon: false,
    isMonster: false,
    isQuestion: false,
    monsterHealth: 0,
    gameHealth: 0,
    isImageShowing: true,
    isPaused: false,
    isUiHidden: false,
};

const creatorSlice = createSlice({
    name: 'creator',
    initialState: initialState,
    reducers: {
        setNumber: (state, action: ActionNumbered) => {
            const key = action.payload.key;
            const value = action.payload.value || 0;

            return {
                ...state,
                [key]: value,
            };
        },
        setBoolean: (state, action: { type: string; payload: BooleanStateMap }) => {
            const key = action.payload.key;
            const value = action.payload.value || false;

            return {
                ...state,
                isDungeon: false,
                isMonster: false,
                isQuestion: false,
                [key]: value,
            };
        },
        setGame: (state, action: SetGameType) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setState: (state, action: ActionStates) => {
            const { key, value } = action.payload;

            return {
                ...state,
                [key]: value,
            };
        },
        toggleImage: state => {
            return {
                ...state,
                isImageShowing: !state.isImageShowing,
            };
        },
        togglePause: state => {
            return {
                ...state,
                isPaused: !state.isPaused,
            };
        },
        toggleUi: state => {
            return {
                ...state,
                isUiHidden: !state.isUiHidden,
            };
        },
    },
});

export const { setNumber, setGame, setState, setBoolean, toggleImage, togglePause, toggleUi } =
    creatorSlice.actions;

export default creatorSlice.reducer;
