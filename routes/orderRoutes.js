import express from "express";
import { addOrder } from "../controllers/orderController.js";
import { checkUser } from "../middlewares/userCheck.js";


const orderRouter = express.Router();

orderRouter.route("/").post(checkUser, addOrder)

export default orderRouter;