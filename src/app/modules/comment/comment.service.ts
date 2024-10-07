import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";


const createCommentIntoDB = async (payload: TComment) => {
    const newComment = await Comment.create(payload);
    if (!newComment) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create comment");
    }
    return newComment;
};
const getCommentFromDB = async (_id: string) => {
    const comment = await Comment.findById(_id);
    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the comment");
    }
    return (await comment.populate('user')).populate('post');
};
const updateCommentIntoDB = async (_id: string, payload: TComment) => {
    const comment = await Comment.findById(_id);
    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the comment");
    }
    const updatedComment = await Comment.findByIdAndUpdate(_id, {
        text: payload.text
    });
    return updatedComment;
};

const getAllCommentsFromDB = async () => {
    const comments = await Comment.find({ isDeleted: { $ne: true } }).select(
        "-createdAt -updatedAt -__v",
    ).populate('user').populate('post');
    return comments;
};
const deleteCommentFromDB = async (_id: string) => {
    const comment = await Comment.findById(_id);
    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the comment");
    }
    const updatedComment = await Comment.findByIdAndUpdate(_id, {
        isDeleted: true
    });
    return updatedComment;
};
export const CommentServices = {
    updateCommentIntoDB,
    getAllCommentsFromDB,
    deleteCommentFromDB,
    getCommentFromDB,
    createCommentIntoDB
};
