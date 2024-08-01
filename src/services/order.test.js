import {configureStore} from '@reduxjs/toolkit';
import reducer, {createOrder, resetOrder} from './order';
import {submitOrder} from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
    submitOrder: jest.fn()
}));

describe('orderSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                order: reducer
            }
        });
    });

    it('should return the initial state', () => {
        const state = store.getState().order;
        expect(state).toEqual({
            order: null,
            loading: 'idle',
            error: null
        });
    });

    it('resetOrder', () => {
        store.dispatch({
            type: resetOrder.type
        });

        const state = store.getState().order;
        expect(state).toEqual({
            order: null,
            loading: 'idle',
            error: null
        });
    });


    it('createOrder.fulfilled', async () => {
        const mockOrder = {id: '123', ingredients: []};
        submitOrder.mockResolvedValue(mockOrder);

        await store.dispatch(createOrder.fulfilled(mockOrder, 'requestId', []));

        const state = store.getState().order;
        expect(state.loading).toBe('idle');
        expect(state.order).toEqual(mockOrder);
        expect(state.error).toBe(null);
    });

    it('createOrder.rejected', async () => {
        const mockError = 'Error occurred';
        submitOrder.mockRejectedValue(new Error(mockError));

        await store.dispatch(createOrder.rejected(new Error(mockError), 'requestId', []));

        const state = store.getState().order;
        expect(state.loading).toBe('idle');
        expect(state.order).toBe(null);
        expect(state.error).toBe(mockError);
    });
});