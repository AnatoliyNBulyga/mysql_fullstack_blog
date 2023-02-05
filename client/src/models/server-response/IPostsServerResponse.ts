import {IPost} from "../posts/IPost";

export interface IPostsServerResponse {
    count: number;
    rows: IPost[];
}