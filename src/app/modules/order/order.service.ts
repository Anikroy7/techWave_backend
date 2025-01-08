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
  if (isOrderExists) {
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

const getOrderFromDB = async (_id: string) => {
  const order = await Order.findById(_id).populate('user');
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the order");
  }
  return order;
};

const getAllOrdersFromDB = async () => {
  const posts = await Order.find({ isDeleted: { $ne: true } }).populate('user').sort({ createdAt: -1 });;
  return posts;
};

const updateOrderIntoDB = async (_id: string, payload: TOrder) => {
  const order = await Order.findById(_id);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the order");
  }

  const updatedData = {
    ...order.toObject(),
    ...payload,
  };
  if (payload.paymentStatus === 'Paid') {
    await User.updateOne({ _id: payload.user }, { isVerified: true, transactionId: order.transactionId, order: order._id })
  } else if (payload.paymentStatus === 'Pending') {
    await User.updateOne({ _id: payload.user }, { isVerified: false, transactionId: null, order: null })
  } else if (payload.paymentStatus === 'Failed') {
    await User.updateOne({ _id: payload.user }, { isVerified: false, transactionId: null, order: null })
  }
  const updatedOrder = await Order.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    select: "-createdAt -updatedAt -__v",
  });
  return updatedOrder;
};

// const user = aqait user find .one 

export const OrderServices = {
  createOrderIntoDB,
  getMyOrderFromDB,
  getOrderFromDB,
  updateOrderIntoDB,
  getAllOrdersFromDB
}