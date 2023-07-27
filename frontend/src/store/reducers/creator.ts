import { fetchStatuses } from '@/helpers';
import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState: Store = {
    dungeons: [],
    dungeonIndex: 0,
    bossIndex: 0,
    name: '',
    status: fetchStatuses.IDLE,
};

const postGame = createAction<Store>('postGame');
const putGame = createAction<Store>('putGame');
const deleteGame = createAction<Store>('deleteGame');

const creatorSlice = createSlice({
    name: 'creator',
    initialState: initialState,
    reducers: {
        addDungeon: (state, action) => {
            state.dungeons = [...state.dungeons, action.payload];
            console.log(state);
        },
        addBoss: state => {
            console.log('boss');
        },
        addQuestion: (state, action) => {
            console.log('question');
        },
        removeDungeon: (state, action) => {
            console.log('remove dungeon');
        },
        removeBoss: (state, action) => {
            console.log('remove boss');
        },
        removeQuestion: (state, action) => {
            console.log('remove question');
        },
    },
    extraReducers: builder => {
        builder.addCase(postGame, (state, action) => {
            console.log('post game');
        });
        builder.addCase(putGame, (state, action) => {
            console.log('put game');
        });
        builder.addCase(deleteGame, (state, action) => {
            console.log('remove game');
        });
    },
});

export const { addDungeon, addBoss, addQuestion, removeDungeon, removeBoss, removeQuestion } =
    creatorSlice.actions;

export default creatorSlice.reducer;
