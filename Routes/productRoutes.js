import express from "express"
import { createProduct, deleteProduct, getSingleItemData, showAllProduct, showCombineData, updateproduct } from "../Controllers/productController.js"
import { uploadMiddleware } from "../middlewares/multer.js"
import { createInverter, deleteInverter, getSingleInverterData, showAllInverter, updateInverter } from "../Controllers/inverterController.js"

const router = express.Router()


// BASE ROUTE   /api/v1/products

router.get("/all",showAllProduct)

router.get("/all/inverter",showAllInverter)

router.get("/all/combine",showCombineData)

router.get("/all/:id",getSingleItemData)

router.get("/all/inverter/:id",getSingleInverterData)

router.post("/new", uploadMiddleware.single('file'),createProduct)

router.post("/new/inverter", uploadMiddleware.single('file'),createInverter)

router.put("/edit/:id", uploadMiddleware.single('file'),updateproduct)

router.put("/edit/inverter/:id", uploadMiddleware.single('file'),updateInverter)

router.delete("/delete/:id", deleteProduct)

router.delete("/delete/inverter/:id", deleteInverter)


export default router