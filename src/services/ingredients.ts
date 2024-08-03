import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../models/common';
import { getIngredients } from '../utils/burger-api';

export interface IngredientsState {
    ingredients: IIngredient[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

export const initialState: IngredientsState = {
    ingredients: [],
    loading: 'idle',
    error: null
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload
        })
        builder.addCase(fetchIngredients.rejected, (state, action) => {
            state.error = action.error.message ?? null
        })
    },
})

export default ingredientsSlice.reducer
