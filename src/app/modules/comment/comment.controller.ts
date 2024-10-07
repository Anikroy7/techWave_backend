import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
    const commentData = req.body;
    const result = await CommentServices.createCommentIntoDB(commentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment created successfully",
        data: result,
    });
});
const getComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;

    const result = await CommentServices.getCommentFromDB(commentId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment retrieved successfully",
        data: result,
    });
});
const updateComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const result = await CommentServices.updateCommentIntoDB(commentId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment updated successfully",
        data: result,
    });
});
const deleteComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const result = await CommentServices.deleteCommentFromDB(commentId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment deleted successfully",
        data: result,
    });
});

const getAllComments = catchAsync(async (req, res) => {

    const result = await CommentServices.getAllCommentsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments retrieved successfully",
        data: result,
    });
});

export const CommentControllers = {
    createComment,
    getComment,
    updateComment,
    getAllComments,
    deleteComment
};
