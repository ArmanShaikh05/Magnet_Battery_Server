import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    boxPrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    vehicles: {
        type: String,
        required: true,
    },
    oldBatteryPrice: {
        type: Number,
        required: true,
    },
    image: {
        url:{
            type: String,
        },
        public_id:{
            type: String,
        }
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    itemCode: {
        type: String,
        required: true,
    },
    voltage: {
        type: Number,
        required: true,
    },
    amphere: {
        type: Number,
        required: true,
    },
    totalWarranty: {
        type: Number,
        required: true,
    },
    freeWarranty: {
        type: Number,
        required: true,
    },
    proRataWarranty: {
        type: Number,
        required: true,
    },

})

export const Product = new mongoose.model('Products', productSchema)