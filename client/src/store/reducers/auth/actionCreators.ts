import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import $axiosClient from "../../../http/clientHttp";

const baseUrl = 'http://localhost:8800/api/auth/'

export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}logout`, { withCredentials: true });
            console.log('response.data in logout', response.data)
            return response.data;
        } catch (e: any) {
            console.log('e in logout ', e.response.data)
            return thunkAPI.rejectWithValue('Something wrong with your logout')
        }
    }
)

export const checkLoginAction = createAsyncThunk(
    'auth/check-login',
    async (_, thunkAPI) => {
        try {
            const response = await $axiosClient.get(`${baseUrl}check-login`, { withCredentials: true });
            console.log('response.data in check-login', response.data)
            return response.data.secureUser;
        } catch (e: any) {
            console.log('e in check-login ', e.response.data)
            return thunkAPI.rejectWithValue('Something wrong with your check-login')
        }
    }
)