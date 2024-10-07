import { TCategory } from "../category/category.interface";
import { TComment } from "../comment/comment.interface";
import { TUser } from "../user/user.interface";

export type TPost ={
    body: string;
    attrachments: string[];
    category: TCategory;
    comments: TComment[];
    upvote: number;
    downvote: number;
    user: TUser;
    isDeleted: boolean;
}