import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {authSlice} from "../reducers/auth/authSlice";
import {ISecureUser} from "../../models/users/ISecureUser";
import {authAPI} from "./AuthService";
import {createApi} from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery(
    {
        baseUrl: 'http://localhost:8800/api',
        credentials: 'include',
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().auth.token
        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`)
        //     }
        //     return headers
        // }
    },
)

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult.data) {
            api.dispatch(authSlice.actions.setCredentials(refreshResult.data as ISecureUser))
            localStorage.setItem('user', JSON.stringify(refreshResult.data))

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log('Error after refresh query')
            localStorage.removeItem('user')
            api.dispatch(authSlice.actions.logOut())
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});