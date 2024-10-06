import { Order } from "../models/Order.js";


export const addOrder = async (req, res) => {

  const { totalAmount, products } = req.body;

  try {
    await Order.create({
      totalAmount,
      products,
      userId: req.userId
    });
    return res.status(200).json('Added Successfully');
  } catch (err) {
    return res.status(400).json(`msg: ${err}`)
  }
}

export const getOrderByUser = async (req, res) => {

  try {
    if (req.isAdmin) {
      const orders = await Order.find({})
      return res.status(200).json(orders)
    } else {
      const orders = await Order.find({
        userId: req.userId
      })
      return res.status(200).json(orders);
    }
  } catch (err) {
    return res.status(400).json(`message: ${err}`)
  }
}