import express from 'express'
import Order from '../model/Orders.js'
import User from '../model/User.js';
import Product from '../model/Product.js'
import bcrypt from "bcrypt"
import { verifyToken } from "../routes/verifyToken.js"
import { serialize } from "cookie";
import Cart from '../model/Cart.js';

const saltRounds = 10;


const router = express.Router()


router.get("/getCart", verifyToken, async (req, res) => {
  const owner = req.user.id;

  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
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
      res.status(404).send({ message: "item not found" });
      return;
    }
    if (item.qty == 0) {
      res.status(404).send({ message: "item out of stock!" });
      return;
    }
    const price = item.price;
    const name = item.name;
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
      //check if product exists or not

      let oldproduct = cart;

      // const test = await Product.findByIdAndUpdate({ _id: itemId },{qty: item.qty += product.quantity });
      // console.log(test)
      if (itemIndex > -1) {
        // console.log("OLD CART:  ", cart)
        let product = cart.items[itemIndex];
        // console.log("cart.items[itemIndex]: ",cart.items[itemIndex])
        console.log(quantity)
        product.quantity += quantity;
        // console.log("product.quantity : ",product.quantity)
        // console.log("oldproduct.quantity : ",oldproduct)
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
        res.status(200).send(cart);
      } else {
        let testing = await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: -1 } });
        console.log(testing)
        cart.items.push({ itemId, name, quantity, price });
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0)

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        owner,
        items: [{ itemId, name, quantity, price }],
        bill: quantity * price,
      });
      console.log(newCart.items[0].itemId)
      // await Product.findByIdAndUpdate({ _id: newCart.items[0].itemId }, { $inc: { qty: -1 } });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
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
      console.log("item.itemId", item.itemId)
      console.log("item.quantity", item.quantity)
      let testing = await Product.findByIdAndUpdate({ _id: itemId }, { $inc: { qty: + item.quantity  } });
      console.log("testing", testing)
      cart = await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});



export default router

