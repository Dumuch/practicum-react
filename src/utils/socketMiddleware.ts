import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../services";
import {UnknownAction} from "@reduxjs/toolkit";
import {getCurrentTimestamp} from "../helpers";

export type AppActions = any;

export type TWSStoreActions<T, S> = {
    wsInit: S,
    onOpen?: (payload: Event) => unknown,
    onClose?: (payload: Event) => unknown,
    onError?: (payload: Event) => unknown,
    onMessage: (payload: T) => unknown,
};

export const socketMiddleware = <T, S>(wsUrl: string, wsActions: TWSStoreActions<T, S>): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const {dispatch, getState} = store;
            const {type} = action;
            const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
            const {user} = getState().userStore;

            if (type === wsInit) {
                let uri = wsUrl
                if (user) {
                    uri = `${wsUrl}?token=${localStorage.getItem('accessToken') ?? ''}`
                }
                socket = new WebSocket(uri);
            }
            if (socket) {
                socket.onopen = event => {
                    onOpen && dispatch(<UnknownAction>onOpen(event));
                };

                socket.onerror = event => {
                    onError && dispatch(<UnknownAction>onError(event));
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restParsedData} = parsedData;

                    dispatch(<UnknownAction>onMessage({...restParsedData, timestamp: getCurrentTimestamp()}));
                };

                socket.onclose = event => {
                    onClose && dispatch(<UnknownAction>onClose(event));
                };
            }

            next(action);
        };
    }) as Middleware;
};