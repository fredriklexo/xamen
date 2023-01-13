import express from 'express'
import Stripe from 'stripe'
import Order from '../model/Orders.js'
import bodyParser from "body-parser"
import User from '../model/User.js'
import bcrypt from "bcrypt"
import {verifyTokenAndAuthorization} from './verifyToken.js';
import * as dotenv from 'dotenv';


const saltRounds = 10;
const stripe = new Stripe(dotenv.config().parsed.STRIPE_KEY);


const router = express.Router()

const fulfillOrder = (lineItems) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
}


const createNewOrder = async (customer,data) => {
  const item = JSON.parse(customer.metadata.cart)
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    product: item,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  })

  try {
      const saveOrder = await newOrder.save()
      console.log("Saved order to mongodb: ",saveOrder)
  } catch (error) {
    console.log(error)
  }
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.


router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, dotenv.config().parsed.STRIPE_WEBHOOK);
  } catch (err) {
    console.log(err)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
      case 'checkout.session.completed':
        const data = event.data.object;
        console.log("checkoutMethod:", data)
        stripe.customers.retrieve(data.customer).then((customer => {
          console.log("customer:", customer)
          createNewOrder(customer,data)
        })).catch(err => console.log(err.message))
        // handlePaymentMethodAttached(paymentMethod);
        break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


export default router

