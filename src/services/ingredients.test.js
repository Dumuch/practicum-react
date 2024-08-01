import {configureStore} from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import reducer, {fetchIngredients} from './ingredients';

fetchMock.enableMocks()

describe('ingredientsSlice', () => {
    const initialState = {
        ingredients: [],
        loading: 'idle',
        error: null
    }

    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should handle fetchIngredients.pending', () => {
        const action = { type: fetchIngredients.pending.type }
        const state = reducer(initialState, action)
        expect(state.error).toBeNull()
        expect(state.loading).toBe('idle')  // As per your current implementation
    })

    it('should handle fetchIngredients.fulfilled', () => {
        const ingredients = [{ id: 1, name: 'Ingredient 1' }, { id: 2, name: 'Ingredient 2' }]
        const action = { type: fetchIngredients.fulfilled.type, payload: ingredients }
        const state = reducer(initialState, action)
        expect(state.ingredients).toEqual(ingredients)
        expect(state.loading).toBe('idle')  // Adjust if you manage loading state
    })

    it('should handle fetchIngredients.rejected', () => {
        const error = { message: 'Failed to fetch ingredients' }
        const action = { type: fetchIngredients.rejected.type, error }
        const state = reducer(initialState, action)
        expect(state.error).toBe(error.message)
        expect(state.loading).toBe('idle')  // Adjust if you manage loading state
    })
})