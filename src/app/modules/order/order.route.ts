import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/", OrderControllers.createOrder,
);
router.post(
  "/payment/confirm", OrderControllers.confirmPayment,
);

router.post(
  "/my-order", OrderControllers.getMyOrder,
);

router.get(
  "/my-order/:userId", OrderControllers.getMySingleOrder,
);

router.get('/:orderId',  OrderControllers.getOrder)

export const OrderRoutes = router;