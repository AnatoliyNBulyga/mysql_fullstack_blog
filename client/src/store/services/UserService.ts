import {baseApi} from "./BaseService";
import {IUpdateUser} from "../../models/users/IUpdateUser";


export const userAPI = baseApi.enhanceEndpoints({ addTagTypes: ['Users'] }).injectEndpoints({
    endpoints: (build) => ({
        updateUser: build.mutation<{success: boolean, message: string}, IUpdateUser>({
            query: (updateUser: IUpdateUser) => ({
                url: '/users',
                method: 'PUT',
                body: updateUser
            }),
            invalidatesTags: ['Users']
        }),
    })
});