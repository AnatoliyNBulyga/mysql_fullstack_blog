import {IPost} from "../../models/posts/IPost";
import {IUser} from "../../models/users/IUser";
import {IPostsServerResponse} from "../../models/server-response/IPostsServerResponse";
import {baseApi} from "./BaseService";


export const postAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], string>({
            query: (query: string) => ({
                url: `/posts/${query}`
            }),
            transformResponse: (response: IPostsServerResponse) => response.rows
        }),
        fetchPost: build.query<IPost & {author: IUser}, number>({
            query: (id: number) => ({
                url: `/posts/${id}`,
                params: {
                    id
                }
            })
        }),
        removePost: build.mutation<{success: boolean, message: string}, number>({
            query: (id: number) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        })
    })
});