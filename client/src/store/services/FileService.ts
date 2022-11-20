import {baseApi} from "./BaseService";


export const fileAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addFile: build.mutation<string, any>({
            query: (formData: any) => ({
                url: `/upload`,
                method: 'POST',
                body: formData
            }),
        })
    })
});