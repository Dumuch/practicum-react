import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../services";
import {UnknownAction} from "@reduxjs/toolkit";
import {getCurrentTimestamp} from "../helpers";

export type AppActions = any;

export type TWSStoreActions<T> = {
    wsInit: string,
    wsClose: string,
    onOpen?: (payload: Event) => unknown,
    onClose?: (payload: Event) => unknown,
    onError?: (payload: Event) => unknown,
    onMessage: (payload: T) => unknown,
};

export const socketMiddleware = <T, S>(wsUrl: string, wsActions: TWSStoreActions<T>, withToken = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const {dispatch} = store;
            const {type} = action;
            const {wsInit, onOpen, onClose, onError, onMessage, wsClose} = wsActions;
            if (type === wsInit) {
                let uri = wsUrl
                if (withToken) {
                    uri = `${wsUrl}?token=${sessionStorage.getItem('accessToken')?.replace('Bearer ', '') ?? ''}`
                }
                socket = new WebSocket(uri);
            }

            if (type === wsClose) {
                socket?.close()
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