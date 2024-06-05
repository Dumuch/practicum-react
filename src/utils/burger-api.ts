import { API } from '../constants';
import { request } from '../helpers';

export const getIngredients = async () => {
    return request(API.ingredients).then(({ data }) => data)
}

export const submitOrder = async (values: object) => {
    return request(API.orders, {
        method: 'POST',
        body: values ? JSON.stringify(values) : undefined,
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    }).then((data) => data)
}
