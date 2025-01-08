import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/", OrderControllers.createOrder,
);

router.get(
  "/", OrderControllers.getAllOrders,
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
router.put('/:orderId',  OrderControllers.updateOrder)

export const OrderRoutes = router;
