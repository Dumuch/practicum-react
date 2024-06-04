import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '../models/common';
import { submitOrder } from '../utils/burger-api';

export interface OrderState {
    order: IOrder | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: OrderState = {
    order: null,
    loading: 'idle',
}

export const createOrder = createAsyncThunk(
    'order/get',
    async (values: string[]) => {
        return await submitOrder({ ingredients: values })
    },
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state: OrderState) => {
            state.order = initialState.order
            state.loading = initialState.loading
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload
        })
    },
})

export const {resetOrder} = orderSlice.actions


export default orderSlice.reducer
