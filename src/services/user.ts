import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ILoginReq, IRegisterReq, IUpdateUserReq, IUser} from '../models/common';
import {
    getCurrentUser,
    login,
    logout,
    refreshToken,
    register,
    updateCurrentUser
} from '../utils/burger-api';

export interface UserState {
    user: IUser | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: UserState = {
    user: null,
    loading: 'idle',
    error: null
}

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async () => {
        return await getCurrentUser()
    },
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (values: IUpdateUserReq) => {
        return await updateCurrentUser(values)
    },
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (values: ILoginReq) => {
        return await login(values)
    },
)

export const registerUser = createAsyncThunk(
    'user/register',
    async (values: IRegisterReq) => {
        return await register(values)
    },
)

export const refreshUserToken = createAsyncThunk(
    'user/token',
    async () => {
        return await refreshToken()
    },
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        return await logout()
    },
)
export const userSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload
        })

        builder.addCase(logoutUser.pending, (state, action) => {
            state.error = null
            state.loading = 'pending'
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            localStorage.removeItem('refreshToken')
            sessionStorage.removeItem('accessToken')
            return initialState
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = 'failed'
        })


        builder.addCase(refreshUserToken.pending, (state, action) => {
            state.error = null
            state.loading = 'pending'
        })
        builder.addCase(refreshUserToken.fulfilled, (state, action) => {
            state.loading = 'succeeded'

            localStorage.setItem('refreshToken', action.payload.refreshToken)
            sessionStorage.setItem('accessToken', action.payload.accessToken)
        })
        builder.addCase(refreshUserToken.rejected, (state, action) => {
            state.loading = 'failed'
        })

        builder.addCase(loginUser.pending, (state, action) => {
            state.error = null
            state.loading = 'pending'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading = 'succeeded'

            localStorage.setItem('refreshToken', action.payload.refreshToken)
            sessionStorage.setItem('accessToken', action.payload.accessToken)
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message ?? null
            state.loading = 'failed'
        })

        builder.addCase(fetchUser.pending, (state, action) => {
            state.error = null
            state.loading = 'pending'
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = 'succeeded'
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = 'failed'
        })

        builder.addCase(registerUser.pending, (state, action) => {
            state.error = null
            state.loading = 'pending'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading = 'succeeded'
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            sessionStorage.setItem('accessToken', action.payload.accessToken)
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message ?? null
            state.loading = 'failed'
        })
    },
})

export const {} = userSlice.actions


export default userSlice.reducer
