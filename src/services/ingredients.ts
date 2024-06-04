import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';
import { getIngredients } from '../utils/burger-api';

export interface IngredientsState {
    ingredients: IIngredient[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: IngredientsState = {
    ingredients: [],
    loading: 'idle',
}

export const fetchIngredients = createAsyncThunk(
    'ingredients/get',
    async () => {
        return await getIngredients()
    },
)

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload
        })
    },
})

export const {} = ingredientsSlice.actions


export default ingredientsSlice.reducer
