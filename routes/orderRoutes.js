import express from "express";
import { addOrder, getAllOrdersForAdmin, getOrderByUser } from "../controllers/orderController.js";
import { adminCheck, checkUser } from "../middlewares/userCheck.js";


const orderRouter = express.Router();

orderRouter.route("/").post(checkUser, addOrder)

orderRouter.route("/all").get(getAllOrdersForAdmin);

export default orderRouter;