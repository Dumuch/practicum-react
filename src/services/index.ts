import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import commonReducer, {
    setOrders,
    setUserOrders,
    INIT_WS_ORDERS,
    CLOSE_WS_ORDERS,
    INIT_WS_USER_ORDERS, CLOSE_WS_USER_ORDERS
} from './common';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import userReducer from './user';
import {
    socketMiddleware
} from "../utils/socketMiddleware";
import {WS_API} from "../constants";

const wsOrdersReducers = {
    wsInit: INIT_WS_ORDERS,
    wsClose: CLOSE_WS_ORDERS,
    onMessage: setOrders
};

const wsUserOrdersReducers = {
    wsInit: INIT_WS_USER_ORDERS,
    wsClose: CLOSE_WS_USER_ORDERS,
    onMessage: setUserOrders
};

export const store = configureStore({
    reducer: {
        commonStore: commonReducer,
        ingredientsStore: ingredientsReducer,
        orderStore: orderReducer,
        userStore: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(WS_API.orders, wsOrdersReducers), socketMiddleware(WS_API.userOrders, wsUserOrdersReducers, true))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()