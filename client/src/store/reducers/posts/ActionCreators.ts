import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchPosts = (search = '') => createAsyncThunk(
    'post/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`/posts${search}`);
            return response.data.rows
        } catch (e) {
            return thunkApi.rejectWithValue('I can not load posts!')
        }
    }
)