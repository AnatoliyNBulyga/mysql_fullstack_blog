import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState, CurrentUser} from "./types";
import {ISecureUser} from "../../../models/users/ISecureUser";
import {checkLoginAction, logoutAction} from "./actionCreators";

const initialState: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("user") || "null"),
    isLoading: false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }: PayloadAction<ISecureUser | null>) => {
            state.currentUser = payload
        },
    },
    extraReducers: {
        [logoutAction.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = '';
            state.currentUser = null;
        },
        [logoutAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logoutAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [checkLoginAction.fulfilled.type]: (state, action: PayloadAction<CurrentUser>) => {
            state.isLoading = false;
            state.error = '';
            state.currentUser = action.payload;
        },
        [checkLoginAction.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkLoginAction.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default authSlice.reducer;