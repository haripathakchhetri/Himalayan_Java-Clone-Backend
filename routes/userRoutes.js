import express from "express"
import { getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
import expressJoiVal from "express-joi-validation"

import Joi from "joi"

const userRouter = express.Router();

const validator = expressJoiVal.createValidator({});

userRouter.route("/").get(getAllUsers)

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

userRouter.route('/register').post(validator.body(registerSchema), registerUser)

userRouter.route('/login').post(validator.body(loginSchema), loginUser)


export default userRouter