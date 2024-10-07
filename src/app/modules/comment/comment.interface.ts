import { TPost } from "../post/post.interface";
import { TUser } from "../user/user.interface";

export type TComment = {
    text: string;
    user: TUser;
    post: TPost;
    isDeleted: boolean;
}