
export interface CurrentUser {
    id: number | null;
    username: string;
    email: string;
    img?: string | null;
}
export interface AuthState {
    currentUser: CurrentUser | null;
    isLoading: boolean;
    error: string;
}