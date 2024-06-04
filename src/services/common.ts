import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';

export interface CommonState {
    applyIngredients: IIngredient[]
    currentIngredient: IIngredient | null
    order: {}
}

const initialState: CommonState = {
    applyIngredients: [],
    currentIngredient: null,
    order: {}
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<IIngredient | null>) =>{
            state.currentIngredient = action.payload
        }
    },
})

export const {setCurrentIngredient} = commonSlice.actions

export default commonSlice.reducer
