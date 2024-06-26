import { createSlice, nanoid } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';
import { arrayMove } from '../helpers';

export interface CommonState {
    applyIngredients: { id: string, data: IIngredient }[]
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
    reducers: (create) => ({
        setCurrentIngredient: create.reducer<IIngredient | null>((state, action) => {
            state.currentIngredient = action.payload
        }),
        addIngredient: create.preparedReducer(
            (ingredient: IIngredient) => {
                const id = nanoid()
                return { payload: { id, data: ingredient } }
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
        })
    }),
})

export const {
    sortApplyIngredients,
    addIngredient,
    setCurrentIngredient,
    setApplyBun,
    removeIngredient
} = commonSlice.actions

export default commonSlice.reducer
