export interface IIngredient {
    _id: string,
    name: string
    type: 'bun' | 'main' | 'sauce',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string
    image_mobile: string
    image_large: string
}

export interface IOrder {
    name: string
    order: {
        number: number
    }
    success: boolean
}

export interface IUser {
    email: string
    name: string
}

export interface IRegisterReq {
    email: string,
    name: string
    password: string
}

export interface IRegisterRes extends IToken{
    success: boolean,
    user: {
        email: string,
        name: string
    },
}

export interface ILoginReq {
    email: string,
    password: string
}

export interface ILoginRes extends IToken{
    success: boolean,
    user: {
        email: string,
        name: string
    },
}

export interface IToken {
    accessToken: string,
    refreshToken: string
}


export interface IUpdateUserReq {
    email: string,
    name: string
}

export type WsOrders = {
    success:boolean
    total: number
    totalToday: number
    orders: TOrder[]
}

export type TOrder = {
    createdAt:string
    ingredients:string[]
    name:string
    number:number
    status: "done" | 'created' | 'pending'
    updatedAt: string
    _id: string
}