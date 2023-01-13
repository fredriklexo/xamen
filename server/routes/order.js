import express from 'express'
import Order from '../model/Orders.js'
import User from '../model/User.js';
import Product from '../model/Product.js'
import Cart from '../model/Cart.js'
import Stripe from 'stripe'
import bcrypt from "bcrypt"
import { verifyToken } from './verifyToken.js';
const YOUR_DOMAIN = 'http://localhost:3000';

const saltRounds = 10;


const router = express.Router()
const stripe = new Stripe("sk_test_51MItJtGqWkaNAgB8Kq08bFqoRccl2Y2Fjh2y452740Dhd44HB5lBvjSeMU810SsDaWaJUQ5jtlJwPxTsDZsPRW7Q00oKsdXXga");
// ----------------- GET -------------------------
//Get all users

router.post('/create', async (req,res) => {
    
    
    try {
        const { item, customer} = req.body;

        let test = await Promise.all(item.map( async (productItem) =>{ 

            let findItem = await Product.find({ _id: { $in: productItem._id } });
            let findUser = await User.find( {_id: customer.id})


            
               

            const newOrder =  new Order({
                customer:  {
                    id: findUser._id,
                    name: findUser.firstName + findUser.lastName
                },
                item: {
                        product: {
                            
                        }, 
                    
                        qty: item.qty
                    }
                    
            })    

            
        }));
       



        // let ids = item.map(function (obj){ return obj._id });
        // console.log(ids)


        // let findItem = await Product.find({ _id: { $in: ids } });

        // let findCustomer = await User.find({ _id: customer.id});
        
        // const newOrder =  new Order({
        //     customer:  {
        //         id: findCustomer._id,
        //         name: findCustomer.firstName + findCustomer.lastName
        //     },
        //     item: {
        //         product: {findItem, qty: item.qty},
                
        //     },
            
        // })

        // res.json(newOrder)
        // newOrder.save()
        // console.log(newOrder)
        
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})
//get all users order 
router.get('/orders', verifyToken, async (req, res) => {
    const owner = req.user._id;
    try {
        const order = await Order.find({ owner: owner }).sort({ date: -1 });
        if(order) {
            return res.status(200).send(order)
        }
        res.status(404).send('No orders found')
    } catch (error) {
        res.status(500).send()
    }
})

//checkout prossece and save order in mongodb
router.post('/create-checkout-session', verifyToken, async(req, res) => {
    try {
        console.log("hej")
        const owner = req.user.id;
        let payload = req.body
       
        //find cart and user 
        let cart = await Cart.findOne({owner})
        let user = req.user
        const stripeCustumer = await stripe.customers.create({
            metadata:{
                userId: owner,
                cart: JSON.stringify(cart)
            }
        })
        console.log("stripeCustumer: ",stripeCustumer)
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
                                    images: [item.src],
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

                success_url: `${YOUR_DOMAIN}/success?id={CHECKOUT_SESSION_ID}`,
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


router.get('/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
  
    res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
  });

export default router

