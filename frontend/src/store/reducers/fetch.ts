import { postGame, putGame, deleteGame } from '@/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
    'game/create',
    async (data: Store, { rejectWithValue }) => {
        try {
            const response = await postGame(data);

            return response.payload;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchPut = createAsyncThunk('game/put', async (data: Store, { rejectWithValue }) => {
    try {
        const response = await putGame(data);

        return response.payload;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchDelete = createAsyncThunk(
    'game/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await deleteGame(id);

            return response.payload;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
