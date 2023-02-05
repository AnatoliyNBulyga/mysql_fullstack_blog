import {baseApi} from "./BaseService";


export const fileAPI = baseApi.enhanceEndpoints({ addTagTypes: ['File'] }).injectEndpoints({
    endpoints: (build) => ({
        addFile: build.mutation<string, any>({
            query: (formData: any) => ({
                url: `/upload`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['File']
        })
    })
});