import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";
import { Post } from "./post.model";
import { TPost } from "./post.interface";

const createPostIntoDB = async (payload: TPost) => {
  const newPost = await Post.create(payload);
  if (!newPost) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create post");
  }
  return newPost;
};
const getPostFromDB = async (_id: string) => {
  const post = await Post.findById(_id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the post");
  }
  return post;
};
const updateUserIntoDB = async (_id: string, payload: TPost) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the user");
  }
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const updatedData = {
    ...user.toObject(),
    ...payload,
  };
  const updatedUser = await User.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    select: "-createdAt -updatedAt -__v",
  });
  return updatedUser;
};

const getAllUsersFromDB = async () => {
  const users = await User.find({ isDeleted: { $ne: true } }).select(
    "-createdAt -updatedAt -__v",
  );
  return users;
};
export const UserServices = {
    createPostIntoDB,
  getUserFromDB,
  updateUserIntoDB,
  getAllUsersFromDB
};
