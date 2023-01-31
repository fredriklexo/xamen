
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import "./cart.css"


async function getData() {

    const res = await fetch("https://xamen-api.vercel.app/cart/getCart", {
        method: 'GET',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",

        },
        withCredentials: true, // should be there
        credentials: 'include', // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary

    }

    return res.json();

}

async function cartHandler(id, qty) {

    const res = await fetch("https://xamen-api.vercel.app/cart/cart", {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                itemId: id,
                quantity: qty
            }
        ),
        withCredentials: true, // should be there
        credentials: 'include', // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary

    }

    return res.json();

}

async function deleteCartItem(id, qty) {

    const res = await fetch("https://xamen-api.vercel.app/cart/deleteItem", {
        method: 'DELETE',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",

        }, body: JSON.stringify(
            {
                itemId: id,
                quantity: qty
            }
        ),
        withCredentials: true, // should be there
        credentials: 'include', // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary

    }
    
    return res.json();

}
async function testPayment(cart) {

    const res = await fetch("https://xamen-api.vercel.app/order/create-checkout-session", {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(
            {
                cart
            }
        ),
        withCredentials: true, // should be there
        credentials: 'include', // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary

    }

    return res.json();

}
export default function Checkout() {
    const router = useRouter();
    let [cart, setCart] = useState([]);



    async function getCart() {
        let response = await getData()
        
        if(response.status == "notAuthorized"){
            router.push("/login")
        }
        if (response.status === "success") {
           
            return setCart(response.data)
        }
        if (response.status === "empty") {
          
            return setCart(response.data, { messages: response.messages })
        }



    };

   
    async function handelClick(id, qty) {
        let response = await cartHandler(id, qty)
        if (response.status === "success") {
            return setCart(response.data)
        }

    };

    async function handelDelete(id, qty) {
        let response = await deleteCartItem(id, qty)
        if (response.status === "success") {
          
           
                return setCart(response.data)

            
        }
    };

    async function handelPayment() {
        let response = await testPayment(cart)
       
        return window.location.assign(response)
    };

    useEffect(() => {

        getCart()
       
    }, []);


    return (
        <>
        { (!cart) ? 
        <div key={cart} className={"emptyCartContainer"}>
            <h1>Your current cart is empty.</h1>
            <img src='/icons/coffee.svg'></img>
            <p>Looks like you have not added anything to your cart.<br/>Go ahead &amp; explore our product page</p>
            <Link className='secondaryColor' href={"/products"}>Continue shoping</Link>
        </div>: undefined
        }


       { (cart) ? <div key={cart._id} className={"styleContainer"} >
            <div  className={ "styleContent"+ " secondaryColor"}>
           
                <div className='styleHeaderContainer'>
                    <h1>My Cart</h1>
                    <p>Items are reserved for 60 minutes</p>
                </div> 
           
            
                { cart.items?.map(item => {
                    console.log(item)
                    return (
                    
                    <div key={item.itemId} className={"styleItem"}  >
                        <img className={"styleImg"} src={item.src}  alt={item.name} ></img>
                        
                            <div className={"styleNameContianer"}>
                                <p>Name:</p>
                                <div className={"styleAlign"}>
                                    <p >{item.name}</p>

                                </div>
                            </div>

                            <div className={"stylePriceContianer"}>
                                <p>Price:</p>
                                <div className={"styleAlign"}>
                                    
                                    <p>{item.price} kr</p>
                                </div>
                            </div>

                            <div className={"styleQtyContianer"}>
                                <p>Quantity:</p>
                                <div className={"styleAlign"+ " styleQtyItems"}>
                                    
                                    <button onClick={() => handelClick(item.itemId,-1)}  className={"styleQty"}>-</button>
                                    <p className={""}>{item.quantity}</p>
                                    <button   onClick={() => handelClick(item.itemId,1)} className={"styleQty"}>+</button>
                                </div>
                            </div>
                            <div className={"styleRemoveContianer"}>

                                <img  alt="trash can white"src="/icons/trash-can-white.png" onClick={() => handelDelete(item.itemId)} className={"styleQty"}></img>
                            </div>
                    </div>


                    )
                })}
            </div>

            <div className={"checkoutContainer"} >
                    <div className={"checkoutWrapper" + " secondaryColor"} >
                        <h2 className={"checkoutHeader"}>Total</h2>
                        <div className={"checkoutInfoContainer"}>
                            <div className={"subtotal"}>
                                <p>Subtotal</p>
                                <span>{cart.bill} sek</span>
                            </div>
                            <div className={"subtotal"}>
                                <p>Delivery</p>
                                <img className={"infoIcon"} src="/icons/info.png"></img>
                            </div>

                        </div>

                        <button onClick={() => handelPayment()} className="payButton">Go to checkout</button>

                        <div className={"checkoutInfoContainer"}>
                            <p>We accept:</p>
                            <div >
                                <img alt="mastercard" className={"paymentIcon"} src="/icons/payment/master.png"></img>
                                <img alt="visacard" className={"paymentIcon"} src="/icons/payment/visa.png"></img>
                                <img alt="amexcard" className={"paymentIcon"} src="/icons/payment/amex.png"></img>
                                <img alt="unionpaycard" className={"paymentIcon"} src="/icons/payment/unionpay.png"></img>
                            </div>

                        </div>
                    </div>
                </div>
                
        </div> :undefined }
        </>
    )

}