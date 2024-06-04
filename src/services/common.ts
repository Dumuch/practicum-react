import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';

export interface CommonState {
    applyIngredients: {id: number, data:IIngredient}[]
    applyBun: IIngredient | null
    currentIngredient: IIngredient | null
    order: {}
}

const initialState: CommonState = {
    applyIngredients: [],
    currentIngredient: null,
    order: {},
    applyBun: null
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<IIngredient | null>) =>{
            state.currentIngredient = action.payload
        },
        addIngredient:(state, action: PayloadAction<IIngredient>) =>{
            const newIngredients = [...state.applyIngredients]
            newIngredients.push({
                id: new Date().getTime(),
                data: action.payload
            })
            state.applyIngredients = newIngredients
        },
        setApplyBun:(state, action: PayloadAction<IIngredient>) =>{
            state.applyBun = action.payload
        },
        removeIngredient:(state, action: PayloadAction<number>) => {
            state.applyIngredients = state.applyIngredients.filter(applyIngredient => applyIngredient.id !== action.payload)
        }
    },
})

export const {addIngredient, setCurrentIngredient, setApplyBun, removeIngredient} = commonSlice.actions

export default commonSlice.reducer
