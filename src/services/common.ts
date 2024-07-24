import {createAction, createSlice, nanoid} from '@reduxjs/toolkit'
import {IIngredient, TOrder, WsOrders} from '../models/common';
import {arrayMove} from '../helpers';

export interface CommonState {
    applyIngredients: { id: string, data: IIngredient }[]
    applyBun: IIngredient | null
    currentIngredient: IIngredient | null
    order: {},
    orders: {
        data: WsOrders | null
    },
    userOrders: {
        data: WsOrders | null
    },
    currentOrder: TOrder | null
}

const initialState: CommonState = {
    applyIngredients: [],
    currentIngredient: null,
    order: {},
    applyBun: null,
    orders: {
        data: null
    },
    userOrders: {
        data: null
    },
    currentOrder: null
}

export const INIT_WS_ORDERS = 'INIT_WS_ORDERS'
export const INIT_WS_USER_ORDERS = 'INIT_WS_USER_ORDERS'

export const CLOSE_WS_ORDERS = 'CLOSE_WS_ORDERS'
export const CLOSE_WS_USER_ORDERS = 'CLOSE_WS_USER_ORDERS'


export const connectWSOrders = createAction(INIT_WS_ORDERS)
export const connectWSUserOrders = createAction(INIT_WS_USER_ORDERS)

export const closeWSOrders = createAction(CLOSE_WS_ORDERS)
export const closeWSUserOrders = createAction(CLOSE_WS_USER_ORDERS)


export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: (create) => ({
        setOrders: create.reducer<WsOrders>((state, action) => {
            state.orders.data = action.payload
        }),
        setUserOrders: create.reducer<WsOrders>((state, action) => {
            state.userOrders.data = action.payload
        }),
        setCurrentIngredient: create.reducer<IIngredient | null>((state, action) => {
            state.currentIngredient = action.payload
        }),
        setCurrentOrder: create.reducer<TOrder | null>((state, action) => {
            state.currentOrder = action.payload
        }),
        addIngredient: create.preparedReducer(
            (ingredient: IIngredient) => {
                const id = nanoid()
                return {payload: {id, data: ingredient}}
            },
            (state, action) => {
                const newIngredients = [...state.applyIngredients]
                newIngredients.push(action.payload)
                state.applyIngredients = newIngredients
            }
        ),
        setApplyBun: create.reducer<IIngredient>((state, action) => {
            state.applyBun = action.payload
        }),
        removeIngredient: create.reducer<string>((state, action) => {
            state.applyIngredients = state.applyIngredients.filter(applyIngredient => applyIngredient.id !== action.payload)
        }),
        sortApplyIngredients: create.reducer<{ dragIndex: number, hoverIndex: number }>((state, action) => {
            state.applyIngredients = arrayMove(state.applyIngredients, action.payload.dragIndex, action.payload.hoverIndex)
        }),
    }),
})

export const {
    sortApplyIngredients,
    addIngredient,
    setCurrentIngredient,
    setApplyBun,
    removeIngredient,
    setOrders,
    setCurrentOrder,
    setUserOrders
} = commonSlice.actions

export default commonSlice.reducer
