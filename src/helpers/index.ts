import { IIngredient } from '../models/common';

export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export const groupIngredients = (ingredients: IIngredient[]) => {

    return ingredients.reduce((acc, ingredient) => {

        if (ingredient.type === 'bun') {
            acc.buns.push(ingredient)
        } else if (ingredient.type === 'main') {
            acc.mains.push(ingredient)
        } else {
            acc.sauces.push(ingredient)

        }
        return acc
    }, {
        buns: [], sauces: [],
        mains: []
    } as {
        buns: IIngredient[], sauces: IIngredient[],
        mains: IIngredient[]
    })
}

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};
