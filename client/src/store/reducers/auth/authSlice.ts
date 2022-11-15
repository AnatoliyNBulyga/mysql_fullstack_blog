import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./types";
import {ISecureUser} from "../../../models/ISecureUser";

const initialState: AuthState = {
    currentUser: {
        id: null,
        username: '',
        email: '',
        img: ''
    },
    isLoading: false,
    error: '',
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }: PayloadAction<ISecureUser>) => {
            state.currentUser = payload
            localStorage.setItem("user", JSON.stringify(payload));
        },
    },
    /* As alternative to authAPI
    extraReducers: {
        [registerAction.fulfilled.type]: (state, action) => {
            state.isLoggedIn = false;
            state.error = '';
        },
        [registerAction.rejected.type]: (state, action) => {
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        [loginAction.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.isLoggedIn = true;
            state.currentUser = {
                ...action.payload
            };
        },
        [loginAction.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [loginAction.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [logoutAction.fulfilled.type]: (state, action) => {
            state.isLoggedIn = false;
            state.currentUser = {
                id: 1,
                username: '',
                email: '',
                img: ''
            };
        },
        [logoutAction.rejected.type]: (state, action) => {
            state.error = action.payload;
        },
    }
    */
})

export default authSlice.reducer;