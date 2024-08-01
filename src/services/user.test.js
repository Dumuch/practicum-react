import { configureStore } from '@reduxjs/toolkit';
import { userSlice, fetchUser, loginUser, registerUser, updateUser, refreshUserToken, logoutUser } from './user'; // Путь к вашему userSlice

const { reducer } = userSlice;

describe('userSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: reducer
            },
        });
    });

    test('should handle fetchUser.pending', () => {
        store.dispatch(fetchUser.pending());
        const state = store.getState().user;
        expect(state.loading).toBe('pending');
        expect(state.error).toBeNull();
    });

    test('should handle fetchUser.fulfilled', async () => {
        const mockUser = { id: '1', name: 'John Doe' }; // Mock user data
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUser),
        });

        await store.dispatch(fetchUser.fulfilled(mockUser, 'fetchUser/fulfilled'));
        const state = store.getState().user;
        expect(state.user).toEqual(mockUser);
        expect(state.loading).toBe('succeeded');
        global.fetch.mockRestore();
    });

    test('should handle loginUser.pending', () => {
        store.dispatch(loginUser.pending());
        const state = store.getState().user;
        expect(state.loading).toBe('pending');
        expect(state.error).toBeNull();
    });

    test('should handle loginUser.fulfilled', async () => {
        const mockLoginResponse = {
            user: { id: '1', name: 'John Doe' },
            refreshToken: 'refresh-token',
            accessToken: 'access-token'
        };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockLoginResponse),
        });

        await store.dispatch(loginUser.fulfilled(mockLoginResponse, 'loginUser/fulfilled'));
        const state = store.getState().user;
        expect(state.user).toEqual(mockLoginResponse.user);
        expect(state.loading).toBe('succeeded');
        expect(localStorage.getItem('refreshToken')).toBe(mockLoginResponse.refreshToken);
        expect(sessionStorage.getItem('accessToken')).toBe(mockLoginResponse.accessToken);
        global.fetch.mockRestore();
    });

    test('should handle loginUser.rejected', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Login failed'));

        await store.dispatch(loginUser.rejected(new Error('Login failed'), 'loginUser/rejected'));
        const state = store.getState().user;
        expect(state.loading).toBe('failed');
        expect(state.error).toBe('Login failed');
        global.fetch.mockRestore();
    });

    test('should handle registerUser.pending', () => {
        store.dispatch(registerUser.pending());
        const state = store.getState().user;
        expect(state.loading).toBe('pending');
        expect(state.error).toBeNull();
    });

    test('should handle registerUser.fulfilled', async () => {
        const mockRegisterResponse = {
            user: { id: '2', name: 'Jane Doe' },
            refreshToken: 'register-refresh-token',
            accessToken: 'register-access-token'
        };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockRegisterResponse),
        });

        await store.dispatch(registerUser.fulfilled(mockRegisterResponse, 'registerUser/fulfilled'));
        const state = store.getState().user;
        expect(state.user).toEqual(mockRegisterResponse.user);
        expect(state.loading).toBe('succeeded');
        expect(localStorage.getItem('refreshToken')).toBe(mockRegisterResponse.refreshToken);
        expect(sessionStorage.getItem('accessToken')).toBe(mockRegisterResponse.accessToken);
        global.fetch.mockRestore();
    });

    test('should handle registerUser.rejected', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Registration failed'));

        await store.dispatch(registerUser.rejected(new Error('Registration failed'), 'registerUser/rejected'));
        const state = store.getState().user;
        expect(state.loading).toBe('failed');
        expect(state.error).toBe('Registration failed');
        global.fetch.mockRestore();
    });

    test('should handle updateUser.fulfilled', async () => {
        const mockUpdatedUser = { id: '1', name: 'John Doe Updated' };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockUpdatedUser),
        });

        await store.dispatch(updateUser.fulfilled(mockUpdatedUser, 'updateUser/fulfilled'));
        const state = store.getState().user;
        expect(state.user).toEqual(mockUpdatedUser);
        expect(state.loading).toBe('idle');
        global.fetch.mockRestore();
    });

    test('should handle refreshUserToken.pending', () => {
        store.dispatch(refreshUserToken.pending());
        const state = store.getState().user;
        expect(state.loading).toBe('pending');
        expect(state.error).toBeNull();
    });

    test('should handle refreshUserToken.fulfilled', async () => {
        const mockTokens = {
            refreshToken: 'new-refresh-token',
            accessToken: 'new-access-token'
        };
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockTokens),
        });

        await store.dispatch(refreshUserToken.fulfilled(mockTokens, 'refreshUserToken/fulfilled'));
        const state = store.getState().user;
        expect(state.loading).toBe('succeeded');
        expect(localStorage.getItem('refreshToken')).toBe(mockTokens.refreshToken);
        expect(sessionStorage.getItem('accessToken')).toBe(mockTokens.accessToken);
        global.fetch.mockRestore();
    });

    test('should handle logoutUser.pending', () => {
        store.dispatch(logoutUser.pending());
        const state = store.getState().user;
        expect(state.loading).toBe('pending');
        expect(state.error).toBeNull();
    });

    test('should handle logoutUser.fulfilled', async () => {
        await store.dispatch(logoutUser.fulfilled({}, 'logoutUser/fulfilled'));
        const state = store.getState().user;
        expect(state).toEqual({
            user: null,
            loading: 'idle',
            error: null
        });
        expect(localStorage.getItem('refreshToken')).toBeNull();
        expect(sessionStorage.getItem('accessToken')).toBeNull();
    });
});