import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import {authAPI} from "./services/AuthService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postAPI} from "./services/PostService";
import {baseApi} from "./services/BaseService";
import {fileAPI} from "./services/FileService";

const rootReducer = combineReducers({
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        baseApi.middleware, authAPI.middleware
    )
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch