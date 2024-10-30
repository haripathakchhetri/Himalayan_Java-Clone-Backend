import express from "express"
// import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import fileUpload from "express-fileupload";
import orderRoutes from './routes/orderRoutes.js'

const app = express()
app.use(express.json());
app.use(cors({ origin: '*' }));

// dotenv.config({
//   path: './.env'
// })

const PORT = 5000

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

// mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(() => {
//   console.log('Database Connected')
// }).catch((err) => {
//   console.log(err)
// })

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes)

app.use('/api/orders', orderRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to Himalayan Java")
})

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT} `)
// })

app.listen(PORT, (e) => {
  console.log(`Listening on port ${PORT} `)
})