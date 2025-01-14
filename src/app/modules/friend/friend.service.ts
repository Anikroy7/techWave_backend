import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFriend } from "./friend.interface";
import { Friend } from "./friend.model";

const createFriendIntoDB = async (payload: TFriend) => {
    const newFriend = await Friend.create(payload);
    if (!newFriend) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create friend");
    }
    return newFriend;
};


export const FriendServices = {
    createFriendIntoDB
}