import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './common';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import userReducer from './user';

export const store = configureStore({
    reducer: {
        commonStore: commonReducer,
        ingredientsStore: ingredientsReducer,
        orderStore: orderReducer,
        userStore: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()