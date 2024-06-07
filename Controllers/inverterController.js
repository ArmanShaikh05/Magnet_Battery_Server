import { Inverter } from "../Models/inverterModel.js";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";

// CREATE NEWS PRODUCT

export const createInverter = async (req, res, next) => {
  try {
    const {
      name,
      boxPrice,
      sellingPrice,
      brand,
      category,
      itemCode,
      voltage,
      watt,
      warranty,
    } = req.body;

    const file = req.file;
    const response = await uploadOnCloudinary(file.path);

    await Inverter.create({
      name,
      boxPrice,
      sellingPrice,
      brand,
      category,
      itemCode,
      voltage,
      watt,
      warranty,
      image: {
        url: response.secure_url,
        public_id: response.public_id,
      },
    });
    res.json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    next(new ErrorHandler(error.message, 500));
  }
};



// UPDATE PRODUCT DATA

export const updateInverter = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        name,
        boxPrice,
        sellingPrice,
        brand,
        category,
        itemCode,
        voltage,
        watt,
        warranty,
      } = req.body;
      
      const file = req.file;
  
      const newsDoc = await Inverter.findById(id);
      if (!newsDoc) return next(new ErrorHandler("Product Not Found", 404));
  
      if (file) {
        const { public_id } = newsDoc.image;
        cloudinary.uploader.destroy(public_id);
        const response = await uploadOnCloudinary(file.path);
        await newsDoc.updateOne({
          image: {
            url: response.secure_url,
            public_id: response.public_id,
          },
        });
      }
  
      await newsDoc.updateOne({
        name,
        boxPrice,
        sellingPrice,
        brand,
        category,
        itemCode,
        voltage,
        watt,
        warranty,
      });
  
      res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
      next(new ErrorHandler(error.message, 500));
    }
  };


  // DELETE A SPECIFIC PRODUCT

export const deleteInverter = async (req, res, next) => {
    try {
      const deleteProduct = await Inverter.findByIdAndDelete(req.params.id);
      if (!deleteProduct) return next(new ErrorHandler("Product Not Found", 404));
  
      const { public_id } = deleteProduct.image;
      cloudinary.uploader.destroy(public_id);
  
      res.status(200).json({
        success: true,
        data: `Product deleted successfully`,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
      next(new ErrorHandler(error.message, 500));
    }
  };



  // SHOW SPECIFIC NEWS DATA

export const getSingleInverterData = async (req, res, next) => {
    try {
      const id = req.params.id;
      const specificData = await Inverter.findById(id);
  
      if (!specificData) return next(new ErrorHandler("Product Not Found", 404));
      res.json(specificData);
    } catch (error) {
      res.json({
        success:false,
        message: error.message
      })
      next(new ErrorHandler(error.message, 500));
    }
  };

// SHOW ALL THE PRODUCTS IN DATABASE

export const showAllInverter = async (req, res, next) => {
    const search = req.query.search ? req.query.search : "";
    const brand = req.query.brand ? req.query.brand : "";
  
  
    let baseQuery = {};
  
    if (search) {
      baseQuery = {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            vehicles: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
  
    }
  
    if (brand)
      baseQuery.brand = {
        $regex: brand,
        $options: "i",
      };
  
  
    try {
      const inverterData = await Inverter.find(baseQuery)

  
      if (!inverterData) return next(new ErrorHandler("No Product Found", 404));
  
      res.json(inverterData);
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
      next(new ErrorHandler(error.message, 500));
    }
  };
  