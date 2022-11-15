import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


interface IRegisterParams {
    username: string;
    email: string;
    password: string;
}

interface ILoginParams {
    username: string;
    password: string;
}

const baseUrl = 'http://localhost:8800/api/auth/'


export const registerAction = createAsyncThunk(
    "auth/register",
    async (registerParmas: IRegisterParams, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}register`, registerParmas);
            console.log('response.data in register', response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something wrong with your register');
        }
    }
);

export const loginAction = createAsyncThunk(
    'auth/login',
    async (loginParams: ILoginParams, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}login`, loginParams, { withCredentials: true });
            console.log('response.data in login', response.data)
            if (response.data.secureUser) {
                localStorage.setItem("user", JSON.stringify(response.data.secureUser));
            }
            console.log('response ', response)
            return { user: response.data.secureUser }
        } catch (e: any) {
            console.log('e in login ', e.response.data)
            return thunkAPI.rejectWithValue('Something wrong with your login');
        }
    }
)

export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}logout`, { withCredentials: true });
            console.log('response.data in logout', response.data)
            if (response.data.status == 200) {
                localStorage.removeItem("user");
            }
            return true;
        } catch (e: any) {
            console.log('e in logout ', e.response.data)
            return thunkAPI.rejectWithValue('Something wrong with your logout')
        }
    }
)