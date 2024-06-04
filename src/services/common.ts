import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';

export interface CommonState {
    ingredients: IIngredient[]
    applyIngredients: IIngredient[]
    currentIngredient: IIngredient | null
    order: {}
}

const initialState: CommonState = {
    ingredients: [],
    applyIngredients: [],
    currentIngredient: null,
    order: {}
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        increment: (state) => {
            // state.value += 1
        },
        decrement: (state) => {
            // state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            // state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = commonSlice.actions

export default commonSlice.reducer
