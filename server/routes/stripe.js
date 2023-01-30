import express from 'express'
import Stripe from 'stripe'
import Order from '../model/Orders.js'
import * as dotenv from 'dotenv';
import Cart from '../model/Cart.js'


const stripe = new Stripe(dotenv.config().parsed.STRIPE_KEY);


const router = express.Router()



const createNewOrder = async (customer,data) => {
  const item = JSON.parse(customer.metadata.cart)
  // let test = await stripe.checkout.sessions.listLineItems(data.id);
  let test = await Cart.findById(item)
  
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    product: test.items,
    subTotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  })

  try {
      const saveOrder = await newOrder.save()
      await Cart.findOneAndDelete({owner:newOrder.userId})
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
        stripe.customers.retrieve(data.customer).then((customer => {
          
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

router.post('/order/success', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    console.log("session",session)
    const customer = await stripe.customers.retrieve(session.customer);

  // res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
  res.status(200).json(customer)
  } catch (error) {
    
  }
  
});

export default router
