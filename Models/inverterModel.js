import mongoose, { Schema } from "mongoose";

const inverterSchema = new Schema({
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


    watt: {
        type: Number,
        required: true,
    },

    
    warranty: {
        type: Number,
        required: true,
    },

})

export const Inverter = new mongoose.model('Inverter', inverterSchema)