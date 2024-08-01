import reducer, {
    initialState as initialStateRaw,
    addIngredient,
    setCurrentIngredient,
    setApplyBun,
    removeIngredient,
    sortApplyIngredients,
    setOrders,
    setCurrentOrder,
    setUserOrders,
} from './common';
import {nanoid} from '@reduxjs/toolkit';
import {arrayMove} from '../helpers';

jest.mock('@reduxjs/toolkit', () => ({
    ...jest.requireActual('@reduxjs/toolkit'),
    nanoid: jest.fn(),
}));

jest.mock('../helpers', () => ({
    arrayMove: jest.fn(),
}));

describe('commonSlice reducers', () => {
    const initialState = {...initialStateRaw};

    it('setOrders', () => {
        const ordersData = {some: 'data'};
        const action = setOrders(ordersData);
        const newState = reducer(initialState, action);
        expect(newState.orders.data).toEqual(ordersData);
    });

    it('setUserOrders', () => {
        const userOrdersData = {some: 'data'};
        const action = setUserOrders(userOrdersData);
        const newState = reducer(initialState, action);
        expect(newState.userOrders.data).toEqual(userOrdersData);
    });

    it('setCurrentIngredient', () => {
        const ingredient = {id: '1', name: 'Test Ingredient'};
        const action = setCurrentIngredient(ingredient);
        const newState = reducer(initialState, action);
        expect(newState.currentIngredient).toEqual(ingredient);
    });

    it('setCurrentOrder', () => {
        const order = {id: '1', items: []};
        const action = setCurrentOrder(order);
        const newState = reducer(initialState, action);
        expect(newState.currentOrder).toEqual(order);
    });

    it('addIngredient', () => {
        const ingredient = {id: '1', name: 'Test Ingredient'};
        const mockId = 'mocked-id';
        nanoid.mockReturnValue(mockId);
        const action = addIngredient(ingredient);
        const newState = reducer(initialState, action);
        expect(newState.applyIngredients).toEqual([{id: mockId, data: ingredient}]);
    });

    it('setApplyBun', () => {
        const bun = {id: '1', name: 'Test Bun'};
        const action = setApplyBun(bun);
        const newState = reducer(initialState, action);
        expect(newState.applyBun).toEqual(bun);
    });

    it('removeIngredient', () => {
        initialState.applyIngredients = [{id: '1', data: {name: 'Test Ingredient'}}];
        const action = removeIngredient('1');
        const newState = reducer(initialState, action);
        expect(newState.applyIngredients).toEqual([]);
    });

    it('sortApplyIngredients', () => {
        const ingredients = [
            {id: '1', data: {name: 'Ingredient 1'}},
            {id: '2', data: {name: 'Ingredient 2'}},
        ];
        initialState.applyIngredients = ingredients;
        const action = sortApplyIngredients({dragIndex: 0, hoverIndex: 1});
        arrayMove.mockReturnValue([ingredients[1], ingredients[0]]);
        const newState = reducer(initialState, action);
        expect(newState.applyIngredients).toEqual([ingredients[1], ingredients[0]]);
    });
});