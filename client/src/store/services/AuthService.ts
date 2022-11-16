import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ILogin} from "../../models/ILogin";
import {ISecureUser} from "../../models/ISecureUser";
import {ISecureUserServerResponse} from "../../models/ISecureUserServerResponse";
import {IRegister} from "../../models/IRegister";
import {ILogoutServerResponse} from "../../models/ILogoutServerResponse";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800/api/auth'}),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
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
        logout: build.mutation<boolean, void>({
            query: () => ({
                url: '/logout',
                credentials: "include",
                method: 'POST',
                body: "",
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (response: ILogoutServerResponse) => response.success,
        }),
        register: build.mutation({
            query: (register: IRegister) => ({
                url: '/register',
                method: 'POST',
                body: register
            }),
            invalidatesTags: ['Auth']
        })
    })
});