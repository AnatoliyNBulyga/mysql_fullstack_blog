import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./types";
import {ISecureUser} from "../../../models/users/ISecureUser";
import {logoutAction} from "./actionCreators";

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
        }
    }
})

export default authSlice.reducer;