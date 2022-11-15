import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../../models/IPost";
import {IUser} from "../../models/IUser";
import {IPostsServerResponse} from "../../models/IPostsServerResponse";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800/api/posts'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], string>({
            query: (query: string) => ({
                url: query
            }),
            providesTags: result => ['Post'],
            transformResponse: (response: IPostsServerResponse) => response.rows
        }),
        fetchPost: build.query<IPost & {author: IUser}, number>({
            query: (id: number) => ({
                url: `/${id}`,
                params: {
                    id
                }
            })
        })
    })
});