import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


const loginUser = async (payload: TLoginUser) => {
  //if the user is exist
  const user = await User.findOne({ email: payload.email }).select(
    "email password role"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
  }
  //if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Invalid crediantial!");

  //create token and sent to the client

  const newUser = await User.findOne({ email: payload.email }).populate({
    path: 'followers',
    select: 'name profileImage',
  }).populate({
    path: 'following',
    select: 'name profileImage',
  });
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    profileImage: newUser?.profileImage,
    name: newUser?.name,
    phone: newUser?.phone,
    address: newUser?.address,
    isVerified: newUser?.isVerified,
  };

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    newUser,
  };
};

const forgetPasswod = async (payload: { email: string }) => {
  //if the user is exist
  const user = await User.findOne({ email: payload.email }).select(
    "email password role"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const resetURl = `${config.send_email_ui_link}/reset-password/?email=${user.email}&token=${accessToken}`;
  await sendEmail(payload.email, resetURl);
  return { resetURl };
};

const resetPasswod = async (payload: { email: string, newPassword: string }, token: string | undefined) => {
  // checking if the token is missing
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You have no access to this route!",
    );
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email, userId } = decoded;
  if (email !== payload.email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Something invalid happen",
    );
  }
  // //if the user is exist
  const user = await User.findOne({ email: payload.email }).select(
    "email password role"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
  }
  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updateUser = await User.findByIdAndUpdate(userId, { password: newPassword })

  return updateUser;

}



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    profileImage: user?.profileImage,
    name: user?.name,
    isVerified:user?.isVerified,
    phone: user?.phone,
    address: user?.address
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};


export const AuthServices = {
  loginUser,
  forgetPasswod,
  resetPasswod,
  refreshToken
};
