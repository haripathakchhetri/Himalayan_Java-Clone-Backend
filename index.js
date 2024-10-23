import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import fileUpload from "express-fileupload";
import orderRoutes from './routes/orderRoutes.js'
import AdminJS from "adminjs"
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import { Product } from "./models/Product.model.js"
import { User } from "./models/User.model.js"
import { Order } from "./models/Order.js"

const app = express()
app.use(express.json());
app.use(cors());

dotenv.config({
  path: './.env'
})

// File upload middleware
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  abortOnLimit: true,
}));

app.use('/uploads', express.static('uploads'))


mongoose.connect('mongodb+srv://hari:hari123@cluster0.uexfwlg.mongodb.net/himalayanJava').then(() => {
  console.log('Database Connected')
}).catch((err) => {
  console.log(err)
})


app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes)

app.use('/api/orders', orderRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to Himalayan Java")
})

app.listen(5000, () => {
  console.log(`Listening on port ${process.env.PORT} `)
})