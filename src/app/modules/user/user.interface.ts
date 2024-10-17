import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TPost } from "../post/post.interface";
import { TOrder } from "../order/order.interface";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  // dateOfBirth: string;
  address: string;
  role: "user" | "admin";
  status: 'active' | 'blocked',
  isDeleted: boolean
  followers: TUser[];
  following: TUser[];
  posts: TPost[]
  order: TOrder;
  isVerified: boolean;
  transactionId: string;   
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
