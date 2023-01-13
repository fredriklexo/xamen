
import mongoose from "mongoose";
const { Schema, model } = mongoose


const orderSchema = new Schema({
        userId:{type: String, require:true},
        customerId: {type: String},
        paymentIntentId:{type: String, require:true},
        item: {
            id: {type: String, require:true},
            qty: {type: Number, require: true},
            price: {type: Number, require: true }
        },
        total: {type: Number, required: true},
        subTotal: {type: Number, required: true},
        shipping:{type: Object, required:true},
        delivery_status: {type: String, default: "pending"},
        payment_status: {type: String, require:true},
    },
    {timestamps: true}
)



const Order = model("Order", orderSchema)
export default Order;