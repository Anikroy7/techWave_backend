import { TComment } from "../comment/comment.interface";
import { TUser } from "../user/user.interface";

export type TPost ={
    body: string;
    attachments?: string[];
    category: string;
    comments: TComment[];
    upvote: TUser[];
    downvote: TUser[];
    user: TUser;
    isDeleted: boolean;
    isPaid: boolean;
}