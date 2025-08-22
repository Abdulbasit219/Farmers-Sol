import express from "express";
import ensureAuthenticated from "../middleware/CheckingAuth.js";
import {
  createOder,
  deleteOrder,
  getAllOrders,
  getBuyerOrders,
  getReceivedOrderByFarmer,
  updateOrderStatus,
} from "../controller/Order.js";
import checkIsAdmin from "../middleware/CheckAdmin.js";

const router = express.Router();

router.post("/create-order", ensureAuthenticated, createOder);

router.get("/", ensureAuthenticated, checkIsAdmin, getAllOrders);

router.get("/getBuyerOrders/:id", ensureAuthenticated, getBuyerOrders);

router.get(
  "/getReceivedOrder/:id",
  ensureAuthenticated,
  getReceivedOrderByFarmer
);

router.patch("/updateOrderStatus/:id", ensureAuthenticated, updateOrderStatus);

router.delete(
  "/deleteOrder/:id",
  ensureAuthenticated,
  checkIsAdmin,
  deleteOrder
);

export default router;
