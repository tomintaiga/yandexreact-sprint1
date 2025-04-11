import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../declarations/user';
import { authApi } from '../api/auth';

export interface IAuthState {
    user: TUser | null;
    token: string | null;
    refreshToken: string | null;
    isAuth: boolean;
};

const initialState: IAuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: TUser; token: string; refreshToken: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuth = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload.user || null;
                state.token = action.payload.accessToken || null;
                state.refreshToken = action.payload.refreshToken || null;
                state.isAuth = true;
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.refreshToken = null;
                state.isAuth = false;
            });
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

