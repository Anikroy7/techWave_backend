import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";
import config from "../../config";
import Order from "./order.model";
import { Request, Response } from "express";
import { User } from "../user/user.model";


const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;
  // console.log('car data', orde rData)
  const result = await OrderServices.createOrderIntoDB(orderData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
const getMyOrder = catchAsync(async (req, res) => {
  const {userId} = req.body;
  const result = await OrderServices.getMyOrderFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrived successfully",
    data: result,
  });
});
const getMySingleOrder = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const result = await OrderServices.getMyOrderFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrived successfully",
    data: result,
  });
});


const confirmPayment = async (req: Request, res: Response) => {

  const _id = req.query.orderId;
  const userId = req.query.userId;
  const tran_id = req.query.tran_id;
  await Order.findByIdAndUpdate(_id, { paymentStatus: "Paid" });
  await User.findByIdAndUpdate(userId, { transactionId: tran_id, isVerified: true, order: _id });
  res.send(`
    
    <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
  </head>
    <style>
      body {
        text-align: center;
        padding: 40px 0;
        background: #EBF0F5;
      }
        h1 {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          font-size: 40px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
    </style>
    <body>
      <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>Payment received successfully!</p>
        <a href='${config.client_base_url}/payment/successfull' className="btn btn-success btn-sm text-white" >Back to home</a>
      </div>
    </body>
</html>
    
    `)
}

const getOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await OrderServices.getOrderFromDB(orderId);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Order retrieved successfully",
      data: result,
  });
});

export const OrderControllers = {
  createOrder,
  confirmPayment,
  getMyOrder,
  getOrder,
  getMySingleOrder
};