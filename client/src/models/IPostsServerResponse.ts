import {IPost} from "./IPost";

export interface IPostsServerResponse {
    count: number;
    rows: IPost[];
}