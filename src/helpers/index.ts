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

export const arrayMove = (arr: any[], old_index: number, new_index: number) => {
    const newArr = [...arr]
    while (old_index < 0) {
        old_index += newArr.length;
    }
    while (new_index < 0) {
        new_index += newArr.length;
    }
    if (new_index >= newArr.length) {
        let k = new_index - newArr.length + 1;
        while (k--) {
            newArr.push(undefined);
        }
    }
    newArr.splice(new_index, 0, newArr.splice(old_index, 1)[0]);
    return newArr;
};

export const request = (url: string, options?: RequestInit) => {
    return fetch(url, options).then(checkResponse)
}

export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;

export const chunkArray = <T>(array: T[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};