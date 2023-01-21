import express from 'express'
import Order from '../model/Orders.js'
import Cart from '../model/Cart.js'
import Stripe from 'stripe'
import { verifyToken } from './verifyToken.js';
import * as dotenv from 'dotenv';


const router = express.Router()
const YOUR_DOMAIN = dotenv.config().parsed.CLIENT_URL
const stripe = new Stripe(dotenv.config().parsed.STRIPE_KEY);

// ----------------- GET -------------------------


//get all users order 

router.get('/getOrderById/:id', verifyToken, async (req, res) => {
    const orderId = req.params.id;
    console.log(orderId)
    try {
        const order = await Order.findById( orderId );
        console.log(orderId)
        if(order.length === 0){
            return res.status(404).json({message:"No order found", status:"fail"})
        }
        if(order) {
            return res.status(200).json({status:"success",data:order})
        }else{

            res.status(404).json({message:"No order found", status:"fail"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, status:"fail"})
    }
})
router.get('/getUserOrder', verifyToken, async (req, res) => {
    const owner = req.user.id;
    console.log("OWENER::",owner)
    try {
        const order = await Order.find({ userId: owner }).sort({ date: -1 });
        
        if(order.length === 0){
            return res.status(404).json({message:"No order found", status:"fail"})
        }
        if(order) {
            return res.status(200).json({status:"success",data:order})
        }else{

            res.status(404).json({message:"No order found", status:"fail"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, status:"fail"})
    }
})

//checkout prossece and save order in mongodb
router.post('/create-checkout-session', verifyToken, async(req, res) => {
    try {
        
        const owner = req.user.id;
        let payload = req.body
       
        //find cart and user 
        let cart = await Cart.findOne({owner})
        let user = req.user
        const stripeCustumer = await stripe.customers.create({
            metadata:{
                userId: owner,
                cart: JSON.stringify(cart._id)
            }
        })
      
        if(cart) {
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {allowed_countries: ['SE', 'NO']},
                shipping_options: [
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {amount: 0, currency: 'sek'},
                      display_name: 'Free shipping',
                      delivery_estimate: {
                        minimum: {unit: 'business_day', value: 5},
                        maximum: {unit: 'business_day', value: 7},
                      },
                    },
                  },
                ],
                line_items: cart.items.map(item => {
                
                    return {
                            price_data: {
                                currency: 'sek',
                                product_data: {
                                    name: item.name,
                                    description: item.description,
                                    metadata: {
                                        id: item.id,
                                      
                                    }
                                },
                                unit_amount: item.price * 100,
                                tax_behavior: 'inclusive',
                            },
                            quantity: item.quantity,
                          }
                        
                    }),
                customer: stripeCustumer.id,
                mode: "payment",
                client_reference_id: owner,

                success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${YOUR_DOMAIN}/cart`,
              });
              
              res.json(session.url);

        } else {
            res.status(400).send('No cart found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('invalid request')
    }
})



export default router

