import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import commonReducer, {INIT_WS, setOrders} from './common';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import userReducer from './user';
import {
    socketMiddleware
} from "../utils/socketMiddleware";
import {WS_API} from "../constants";

const wsOrdersReducers = {
    wsInit: INIT_WS,
    onMessage: setOrders
};

export const store = configureStore({
    reducer: {
        commonStore: commonReducer,
        ingredientsStore: ingredientsReducer,
        orderStore: orderReducer,
        userStore: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(WS_API.orders, wsOrdersReducers))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()