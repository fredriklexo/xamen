import mongoose from "mongoose";
const { Schema, model } = mongoose


const productSchema = new Schema({
        name: {type: String, require: true},
        categoryId: {type: Array, require: true},
        description: {type:String, require: true},
        features: {type: String, require: true},
        price: {type: Number, require: true},
        slug: {type: String, require: true},
        src:{type:String, require: true},
        qty:  {type: Number,required:true, default:1},
        type: {type:String, require: true},
},{timestamps: true})

const Product = model("Product", productSchema)
export default Product;