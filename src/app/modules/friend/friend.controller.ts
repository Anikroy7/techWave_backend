import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FriendServices } from "./friend.service";

const createPost = catchAsync(async (req, res) => {
    const friendData = req.body;
    const result = await FriendServices.createFriendIntoDB(friendData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post created successfully",
        data: result,
    });
});