import express from "express"
import { createProduct, deleteProduct, getSingleItemData, showAllProduct, updateproduct } from "../Controllers/productController.js"
import { uploadMiddleware } from "../middlewares/multer.js"

const router = express.Router()


// BASE ROUTE   /api/v1/products

router.get("/all",showAllProduct)

router.get("/all/:id",getSingleItemData)

router.post("/new", uploadMiddleware.single('file'),createProduct)

router.put("/edit/:id", uploadMiddleware.single('file'),updateproduct)

router.delete("/delete/:id", deleteProduct)


export default router