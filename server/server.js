
import mongoose from 'mongoose';
import cors from 'cors'
import express from 'express';
import * as dotenv from 'dotenv';
import  productRouter  from './routes/products.js';
import  categoryRouter  from './routes/category.js';
import usersRouter from "./routes/user.js"
import orderRouter from "./routes/order.js"
import cartRouter from "./routes/cart.js"
import authRouter from "./routes/auth.js"
import stripeRouter from "./routes/stripe.js"
import cp from "cookie-parser"

const app = express()

mongoose.connect(dotenv.config().parsed.DB_CONNECTION, {useNewUrlParser: true})
const db =  mongoose.connection.getClient("store")

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))


//middelware
app.use(cors({ origin: true, credentials: true }));
app.use(cp())
app.use('/stripe/webhook', stripeRouter, express.raw({ type: 'application/json' }), stripeRouter)
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

//routes
app.use('/product',productRouter)
app.use('/category',categoryRouter)


app.use('/user', usersRouter)
app.use('/auth', authRouter)

app.use('/stripe', stripeRouter)
app.use('/order', orderRouter)
app.use('/cart', cartRouter)





app.listen(5000, () => {console.log("Server started on port 5000")})