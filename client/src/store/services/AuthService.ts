import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ILogin} from "../../models/auth/ILogin";
import {ISecureUser} from "../../models/users/ISecureUser";
import {ISecureUserServerResponse} from "../../models/server-response/ISecureUserServerResponse";
import {IRegister} from "../../models/auth/IRegister";



export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:8800/api/auth',
        }
    ),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        // checkLogin: build.query<ISecureUser, void>({
        //     query: () => ({
        //         url: '/check-login',
        //         credentials: "include",
        //     }),
        //     transformResponse: (response: ISecureUserServerResponse) => response.secureUser,
        // }),
        login: build.mutation<ISecureUser, ILogin>({
            query: (login: ILogin) => ({
                url: '/login',
                credentials: "include",
                method: 'POST',
                body: login,
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (response: ISecureUserServerResponse) => response.secureUser,
        }),
        register: build.mutation<boolean, IRegister>({
            query: (register: IRegister) => ({
                url: '/register',
                method: 'POST',
                body: register
            }),
            invalidatesTags: ['Auth']
        })
    })
});