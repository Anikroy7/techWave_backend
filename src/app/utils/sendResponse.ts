import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?:string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data?.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    accessToken: data.accessToken,
    refreshToken:data.refreshToken
  });
};

export default sendResponse;
