import { User } from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getAllUsers = (req, res) => {
  return res.status(200).json({ message: "All Users Available" })
}

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashPass = bcrypt.hashSync(password, 10);

    await User.create({
      fullname,
      email,
      password: hashPass
    })

    return res.status(201).json({ message: "Successfully registered" })

  } catch (err) {
    return res.status(400).json({ message: `${err}` })
  }
}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(404).json({ message: "User doesn\'t exist" })

    const pass = bcrypt.compareSync(password, isExist.password);

    if (!pass) return res.status(401).json({ message: "Invalid credential" });

    const token = jwt.sign({
      id: isExist._id,
      isAdmin: isExist.isAdmin,
    }, 'secret')

    return res.status(200).json({
      token,
      email: isExist.email,
      fullname: isExist.fullname,
      isAdmin: isExist.isAdmin,
      id: isExist._id
    })

  } catch (err) {
    return res.status(400).json({ message: `${err}` })
  }
}