import mongoose from "mongoose";
const { Schema, model } = mongoose


const productSchema = new Schema({
        name: String,
        categoryId: Array,
        description: String,
        features: String,
        price: Number,
        slug: String,
        image:{type:String},
        qty:  {type: Number,required:true, default:1},
        inStock: Number
},{timestamps: true})

const Product = model("Product", productSchema)
export default Product;