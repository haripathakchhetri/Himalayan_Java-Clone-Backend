import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import fs from "fs"

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products)
  } catch (err) {
    return res.status(400).json({ message: `${err}` })
  }
}

export const getProductById = async (req, res) => {

  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });

  }
}

export const addProduct = async (req, res) => {

  const { title, price, stock } = req.body;

  try {
    await Product.create({
      title,
      price: Number(price),
      stock: Number(stock),
      image: req.imagePath,
    });

    return res.status(200).json({ message: 'Product Added Successfully' })

  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => {

    })

    return res.status(400).json({ message: `${err}` })
  }
}

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.isValidObjectId(id)) {

      const isExist = await Product.findById(id);
      console.log(isExist)
      if (isExist) {
        await Product.findByIdAndDelete(id);
        fs.unlink(`.${isExist.image}`, (err) => {

        });

        return res.status(200).json({ message: "Successfully Deleted" });
      }

    }

    return res.status(400).json({ message: "Please Provide valid id" })
  } catch (err) {
    return res.status(400).json({ message: `${err}` })
  }
}

export const updateProduct = async (req, res) => {

  const { id } = req.params;

  try {

    if (mongoose.isValidObjectId(id)) {

      const isExist = await Product.findById(id);

      if (isExist) {

        const updateObj = {
          title: req.body.title || isExist.title,
          price: Number(req.body.price) || isExist.price,
          stock: Number(req.body.stock) || isExist.stock
        };

        if (req.imagePath) {
          await isExist.updateOne(
            {
              ...updateObj,
              image: req.imagePath
            });

          fs.unlink(`.${isExist.image}`, (err) => {

          });

        } else {
          await isExist.updateOne(updateObj);
        }

        return res.status(200).json({ message: 'Successfully Updated' })
      }
    }

    if (req.imagePath) fs.unlink(`.${req.imagePath}`, (err) => {

    })

    return res.status(400).json({ message: "Please Provide valid id" });

  } catch (err) {
    if (req.imagePath) fs.unlink(`.${req.imagePath}`, (err) => {

    });
    return res.status(400).json({ message: `${err}` });
  }
}