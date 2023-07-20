import { configureStore } from '@reduxjs/toolkit';
import creatorReducer from './reducers/creator';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        creator: creatorReducer,
    },
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
