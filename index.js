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

// // File upload middleware
// app.use(fileUpload({
//   limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
//   abortOnLimit: true,
// }));

app.use('/uploads', express.static('uploads'))

AdminJS.registerAdapter({
  Database,
  Resource
});

const start = async () => {

  // This facilitates the connection to the mongo database


  // We will need to create an instance of AdminJS with a basic resource
  const admin = new AdminJS({
    resources: [
      {
        resource: Product,
        options: {

          properties: {

            createdAt: { isVisible: false },
            updatedAt: { isVisible: false },
          },
          labels: {
            name: 'labels.Product',
          },

        }
      },
      {
        resource: User,
        options: {
          properties: {
            createdAt: { isVisible: false },
            updatedAt: { isVisible: false },
          }
        }
      },
      {
        resource: Order,
        options: {
          properties: {
            createdAt: { isVisible: false },
            updatedAt: { isVisible: false },
          }
        }
      }
    ]
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)

  app.use(admin.options.rootPath, adminRouter)

  app.listen(process.env.PORT, () => {
    console.log(`AdminJS started on http://localhost:${process.env.PORT}${admin.options.rootPath}`)
  })
}

start()


mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(() => {
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

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT} `)
// })