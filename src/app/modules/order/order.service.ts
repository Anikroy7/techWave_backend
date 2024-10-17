import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import { User } from "../user/user.model";
import { generateTransactionId } from "../../utils/generateRandom";
import { makePayment } from "../payment/payment.utils";
import mongoose from "mongoose";

const createOrderIntoDB = async (payload: TOrder) => {

  const userInfo = await User.findById(payload.user);

  if (!userInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is not exists!!");
  }
  const transactionId = generateTransactionId();
  const orderData = {
    user: userInfo,
    transactionId,
    totalPrice: payload.totalPrice,
    startDate: payload.startDate,
    endDate: payload.endDate
  }
  const isOrderExists = await Order.findOne({ user: new mongoose.Types.ObjectId(userInfo._id) });
  if(isOrderExists){
    throw new AppError(httpStatus.BAD_REQUEST, "All ready made payment!!");
    
  }
  const newOrder = await Order.create(orderData);
  const paymentInfo = {
    transactionId,
    totalPrice: payload.totalPrice,
    user: {
      _id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      address: userInfo.address,
      phone: userInfo.phone
    },
    orderId: newOrder._id,
  }
  const response = await makePayment(paymentInfo);
  return response.data.payment_url;

};


const getMyOrderFromDB = async (userId: string) => {
  const myorder = await Order.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate('user');
  return myorder
    
};
export const OrderServices = {
  createOrderIntoDB,
  getMyOrderFromDB
}