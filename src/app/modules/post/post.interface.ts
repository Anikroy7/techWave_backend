import { TComment } from "../comment/comment.interface";
import { TUser } from "../user/user.interface";

export type TPost ={
    body: string;
    attachments?: string[];
    category: string;
    comments: TComment[];
    upvote: number;
    downvote: number;
    user: TUser;
    isDeleted: boolean;
}