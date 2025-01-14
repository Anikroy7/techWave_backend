import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { PostServices } from "./post.service";
import pick from "../../utils/pick";
import { Post } from "./post.model";
import { TPost } from "./post.interface";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const createPost = catchAsync(async (req, res) => {
    const postData = req.body;
    const result = await PostServices.createPostIntoDB(postData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post created successfully",
        data: result,
    });
});
const getPost = catchAsync(async (req, res) => {
    const { postId } = req.params;

    const result = await PostServices.getPostFromDB(postId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved successfully",
        data: result,
    });
});
const updatePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await PostServices.updatePostIntoDB(postId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post updated successfully",
        data: result,
    });
});
const deletePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await PostServices.deletePostFromDB(postId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted successfully",
        data: result,
    });
});

const getAllPosts = catchAsync(async (req, res) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await PostServices.getAllPostsFromDB(options);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts retrieved successfully",
        data: result,
    });
});
const getMyPosts = catchAsync(async (req, res) => {
    const { userId } = req.query;
    // console.log(userId)
    const result = await PostServices.getMyPostsFromDB(userId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Posts retrieved successfully",
        data: result,
    });
});
// ! temp
const createPostMany = catchAsync(async (req, res) => {

    // const posts = req.body;

    // posts.forEach(async (element) => {
    //     const newPost = await Post.create(element);
    //     if (!newPost) {
    //         throw new AppError(httpStatus.BAD_REQUEST, "Failed to create post");
    //     }
    //     await User.updateOne({ _id: element.user }, { $push: { posts: newPost._id } })

    // });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Posts many successfully",
        data: 'result',
    });
});

export const PostControllers = {
    createPost,
    getPost,
    updatePost,
    getAllPosts,
    deletePost,
    getMyPosts,
    createPostMany
};
