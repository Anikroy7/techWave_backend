import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  return newUser;
};
const getUserFromDB = async (_id: string) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the user");
  }
  return user;
};
const updateUserIntoDB = async (_id: string, payload: TUser) => {
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
const addUserFollwers = async (userId: string, follwerId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the user");
  }
  const follwingUser = await User.findById(follwerId);
  if (!follwingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the following user");
  }
  const updatedUser = await User.updateOne({ _id: userId }, { $push: { followers: follwerId } });
  return updatedUser;
};
const deleteUserFollwers = async (userId: string, follwerId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the user");
  }
  const follwingUser = await User.findById(follwerId);
  if (!follwingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the following user");
  }
  const updatedUser = await User.updateOne({ _id: userId }, { $pull: { followers: follwerId } });
  return updatedUser;
};
export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  updateUserIntoDB,
  addUserFollwers,
  getAllUsersFromDB,
  deleteUserFollwers
};
