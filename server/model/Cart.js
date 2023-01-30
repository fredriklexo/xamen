import mongoose from "mongoose";
const { Schema, model } = mongoose

const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new Schema({

    owner : {
        type: ObjectID,
         required: true,
         ref: 'User'
       },
      items: [{
        itemId: {
         type: ObjectID,
         ref: 'Item',
         required: true
      },
      name: {type: String, required: true},
      src: {type: String, required: true},
      quantity: {
         type: Number,
         required: true,
         min: 1,
         max:30,
         default: 1},
         price: Number
       }
      
      ],
      bill: {
          type: Number,
          required: true,
         default: 0
        }
      }, {
      timestamps: true
      }



)

const Cart = model("Cart", cartSchema)
export default Cart;

