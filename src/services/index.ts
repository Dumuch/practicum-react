import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './common';
import ingredientsReducer from './ingredients';

export const store = configureStore({
    reducer: {
        common: commonReducer,
        ingredients: ingredientsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
