import express from "express"
import { addProduct, getAllProducts, getProductById, removeProduct, updateProduct } from "../controllers/productController.js";
import { updateFile, validFile } from "../middlewares/fileValid.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(validFile, addProduct);

productRouter.route("/:id").get(getProductById).patch(updateFile, updateProduct).delete(removeProduct)

export default productRouter;