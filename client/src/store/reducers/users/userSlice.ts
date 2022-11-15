import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSuccess(state, action) {
            state.isLoading = false;
            state.error = '';
            state.error = action.payload;
        },
        userFetchingError(state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default userSlice.reducer;