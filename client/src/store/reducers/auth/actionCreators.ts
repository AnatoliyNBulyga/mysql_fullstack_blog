import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:8800/api/auth/'

export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}logout`, { withCredentials: true });
            console.log('response.data in logout', response.data)
            return true;
        } catch (e: any) {
            console.log('e in logout ', e.response.data)
            return thunkAPI.rejectWithValue('Something wrong with your logout')
        }
    }
)