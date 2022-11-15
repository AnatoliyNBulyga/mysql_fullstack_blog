import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import {authAPI} from "./services/AuthService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postAPI} from "./services/PostService";

const rootReducer = combineReducers({
    authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authAPI.middleware,
        postAPI.middleware
    )
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch