import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./types";
import {ISecureUser} from "../../../models/users/ISecureUser";

const initialState: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("user") || "null"),
    isLoading: false,
    error: '',
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }: PayloadAction<ISecureUser>) => {
            state.currentUser = payload
            state.isLoggedIn = true
        },
        logOut: (state) => {
            state.currentUser = null
            state.isLoggedIn = false
        }
    },
    // Example for extra reducers
    // extraReducers: {
    //     [fetchPosts().fulfilled.type]: (state, action) => {
    //         state.isLoading = false;
    //         state.error = '';
    //         state.posts = action.payload;
    //     },
    //     [fetchPosts().pending.type]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [fetchPosts().rejected.type]: (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     }
    // }
})

export default authSlice.reducer;