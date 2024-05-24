import { API } from '../constants';
import { checkResponse } from '../helpers';

export const getIngredients = async () => {
    return fetch(API.ingredients)
        .then(checkResponse).then(({ data })=> data)
}
