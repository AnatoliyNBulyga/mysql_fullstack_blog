import {IPost} from "../../models/posts/IPost";
import {IUser} from "../../models/users/IUser";
import {IPostsServerResponse} from "../../models/server-response/IPostsServerResponse";
import {baseApi} from "./BaseService";
import {ICreateOrUpdatePost} from "../../models/posts/ICreatePost";


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
        createPost: build.mutation<{success: boolean, message: string}, ICreateOrUpdatePost>({
            query: (createPost: ICreateOrUpdatePost) => ({
                url: '/posts',
                method: 'POST',
                body: createPost
            })
        }),
        updatePost: build.mutation<{success: boolean, message: string}, {id: number, updatePost: ICreateOrUpdatePost}>({
            query: ({id, updatePost}: {id: number, updatePost: ICreateOrUpdatePost}) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: updatePost
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