import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TPost } from "../post/post.interface";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  address: string;
  role: "user" | "admin";
  status: 'active' | 'blocked',
  isDeleted: boolean
  followers: TUser[];
  following: TUser[];
  posts: TPost[]   
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
