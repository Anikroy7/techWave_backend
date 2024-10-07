import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const urls = [];
  if (req.files) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    for (const file of files) {
      const newPath = (await uploadImageToCloudinary(
        `${process.cwd()}/${file.path}`,
        file.path
      )) as any;
      urls.push(newPath.secure_url);
    }
  }
  userData.images = urls;
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  const { userId } = (req as any).user;

  const result = await UserServices.getUserFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { userId } = (req as any).user;

  const result = await UserServices.updateUserIntoDB(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {

  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getUser,
  updateUser,
  getAllUsers
};
