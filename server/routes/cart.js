import express from 'express'
import Product from '../model/Product.js'
import { verifyToken } from "../routes/verifyToken.js"
import Cart from '../model/Cart.js';


const router = express.Router()


router.get("/getCart", verifyToken, async (req, res) => {
  const owner = req.user.id;

  try {
    const cart = await Cart.findOne({ owner });
    
    if (cart && cart.items.length > 0) {
      res.status(200).json({data: cart, status:"success"});
    } else {
      res.json({message: "Your cart is empty", status:"empty",data: false});
    }
  } catch (error) {
    res.status(500).json();
  }
});

//add cart
router.post("/cart", verifyToken, async (req, res) => {
  const owner = req.user.id;
  const { itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ owner });
    const item = await Product.findOne({ _id: itemId });

    if (!item) {
      res.status(404).json({ message: "item not found" });
      return;
    }
    if (item.qty == 0) {
      res.status(404).json({ message: "item out of stock!" });
      return;
    }
    const price = item.price;
    const name = item.name;
    const src = item.src


    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
      //check if product exists or not

      if (itemIndex > -1) {

        let product = cart.items[itemIndex];
        
        product.quantity += quantity;
        if (quantity === 1) {
          await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: -1 } });
        } else {
          await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: +1 } });
        }

        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0)

        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).json({data: cart, status:"success"});
      } else {
        await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: -1 } });

        cart.items.push({ itemId, name, quantity, price, src });
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0)

        await cart.save();
        res.status(200).json({data: cart, status:"success"});
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        owner,
        items: [{ itemId, name, quantity, price, src }],
        bill: quantity * price,
      });

      await Product.findByIdAndUpdate({ _id: newCart.items[0].itemId }, { $inc: { qty: -1 } });
      return res.status(201).json({data: newCart, status:"success"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "something went wrong!", status:"fail",data: false});
  }
});

//delete item in cart

router.delete("/deleteItem", verifyToken, async (req, res) => {
  const owner = req.user.id;
  const itemId = req.body.itemId;
  try {
    let cart = await Cart.findOne({ owner });

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.bill -= item.quantity * item.price;
      if (cart.bill < 0) {
        cart.bill = 0
      }
      cart.items.splice(itemIndex, 1);
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0)

      await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: + item.quantity } });
      
      if(cart.items.length === 0){
        cart = await Cart.findOneAndRemove({ owner });
        res.status(200).json({data: false, status: "success"});
      }else{
        cart = await cart.save();
        res.status(200).json({data: cart, status: "success"});
      }
    
      
     
    } else {
      res.status(404).json({message: "item not found", status:"fail",data: false})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
});



export default router

