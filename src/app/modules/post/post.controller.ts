import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { PostServices } from "./post.service";

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

    const result = await PostServices.getAllPostsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts retrieved successfully",
        data: result,
    });
});
const getMyPosts = catchAsync(async (req, res) => {
    const {userId} = req.query;
// console.log(userId)
    const result = await PostServices.getMyPostsFromDB(userId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Posts retrieved successfully",
        data: result,
    });
});





export const PostControllers = {
    createPost,
    getPost,
    updatePost,
    getAllPosts,
    deletePost,
    getMyPosts
};
