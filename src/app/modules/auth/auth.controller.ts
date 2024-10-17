import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, newUser, refreshToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    accessToken,
    refreshToken,
    data: newUser,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  await AuthServices.forgetPasswod(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reset url send successfully. Please check your email.",
    data: '',
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const result = await AuthServices.resetPasswod(req.body, token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password reset successfully",
    data: result,
  });
});


const refreshToken = catchAsync(async (req, res) => {
  const token = req.headers.cookie?.split(" ")[1] as string;
  const result = await AuthServices.refreshToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  forgetPassword,
  resetPassword,
  refreshToken
};
