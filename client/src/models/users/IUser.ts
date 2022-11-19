export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    hashed_refresh_token: string | null;
    img?: string | null;
}