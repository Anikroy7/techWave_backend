import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Post } from "./post.model";
import { TPost } from "./post.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { paginationHelper } from "../../utils/paginationHelpers";
import { IPaginationOptions } from "../../types";

const createPostIntoDB = async (payload: TPost) => {
    const newPost = await Post.create(payload);
    if (!newPost) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create post");
    }
    await User.updateOne({ _id: payload.user }, { $push: { posts: newPost._id } })
    return newPost;
};
const getPostFromDB = async (_id: string) => {
    const post = await Post.findById(_id).populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'name profileImage'
        },
    }).populate('user');
    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the post");
    }
    return post;
};
const updatePostIntoDB = async (_id: string, payload: TPost) => {
    const post = await Post.findById(_id);
    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the post");
    }

    const updatedData = {
        ...post.toObject(),
        ...payload,
    };
    const updatedPost = await Post.findByIdAndUpdate(_id, updatedData, {
        new: true,
        runValidators: true,
        select: "-createdAt -updatedAt -__v",
    });
    return updatedPost;
};

const getAllPostsFromDB = async (options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);

    const posts = await Post.find({ isDeleted: { $ne: true }, }).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'name profileImage followers following'
        },
    }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Post.countDocuments({ isDeleted: false });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: posts
    };
};
const getMyPostsFromDB = async (userId: string) => {
    const objectId = new mongoose.Types.ObjectId(userId);
    const posts = await Post.find(
        { user: objectId, isDeleted: { $ne: true } }
    )
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'name profileImage followers following'
            },
        })
        .sort({ createdAt: -1 });
    return posts;
};
const deletePostFromDB = async (_id: string) => {

    const post = await Post.findById(_id);
    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the post");
    }
    const updatedPost = await Post.findByIdAndUpdate(_id, {
        isDeleted: true
    });
    return updatedPost;
};


export const PostServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    updatePostIntoDB,
    getPostFromDB,
    deletePostFromDB,
    getMyPostsFromDB
};
