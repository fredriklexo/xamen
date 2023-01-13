
'use client'
import  { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
async function getData() {

    const res = await fetch("http://localhost:5000/cart/getCart", {
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

async function cartHandler(id,qty) {

    const res = await fetch("http://localhost:5000/cart/cart", { 
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
    
    return  res.json();

}

async function deleteCartItem(id,qty) {

    const res = await fetch("http://localhost:5000/cart/deleteItem", {
        method: 'DELETE',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",

        },body: JSON.stringify(
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
    console.log(res)
    return res.json();

}
async function testPayment(cart) {

    const res = await fetch("http://localhost:5000/order/create-checkout-session", { 
    method: 'POST',
    Authorization: "Bearer sk_test_51MItJtGqWkaNAgB8Kq08bFqoRccl2Y2Fjh2y452740Dhd44HB5lBvjSeMU810SsDaWaJUQ5jtlJwPxTsDZsPRW7Q00oKsdXXga",
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
    
    return  res.json();

}
export default function CartMrFoo() {
    // let tooken = null
    
    // var item = await getData()
    let [cart, setCart] = useState([]);
    
    console.log("dddd",cart)

    let getCart = async () => { 
        let  response = await getData()
        console.log(response)
        return setCart(response)

    };
    
    // console.log(item)
    async function handelClick (id,qty){
       let response =  await cartHandler(id,qty)
       return setCart(response)
            
    };

    async function handelDelete (id,qty){
       let response =  await deleteCartItem(id,qty)
       console.log(response)
       return setCart(response)
            
    };

    async function handelPayment (){
       let response =  await testPayment(cart)
       console.log(response)
       return  window.location.assign(response)           
    };

    useEffect(() => {
        getCart()
        
    }, []);
    
    
    return (
        
        <div style={styleContainer}>
            <p></p>
            {cart.items?.map(item => {
                return(

                <div key={item.itemId} style={styleItem}>
                    <img style={styleImg} src="/product/caffe-verona.png"></img>
                    <div>
                    <div style={styleFeaturesContianer}>
                            <h2 >{item.name}</h2>
                            <img style={styleFeaturesIcon} src="/product/icons-coffee-beans.png"></img>
                        </div>
                        <h2>{item.price} kr</h2>
                        <div >
                            
                            <button onClick={() => handelClick(item.itemId,-1)}  style={styleQty}>-</button>
                            <span style={styleQty}>{item.quantity}</span>
                            <button   onClick={() => handelClick(item.itemId,1)} style={styleQty}>+</button>
                            <button   onClick={() => handelDelete(item.itemId,1)} style={styleQty}>Remove</button>
                        </div>
                    </div>
                </div>
                )
            })}
                <div style={checkoutContainer}>
                    <div style={checkoutWrapper}>
                        <h2>Checkout container</h2>
                        <div>
                            <h2>Total amount:</h2>
                            <span>{cart.bill} sek</span>
                        </div>

                        <button onClick={() => handelPayment()} className="payButton">Pay</button>
                    </div>
                </div>
        </div>
        
    )

}
let checkoutContainer = {}
let checkoutWrapper = {}

let styleContainer  = {
    display: "flex",
    flex: "2",
    flexDirection: "column",
}

let styleItem  = {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.042)"
}
let styleImg  = {
    width: "250px",
    paddingBottom: "20px"
}
let styleFeaturesContianer = {
    display: "flex",
    alignItems: "center"
}

let styleFeaturesIcon = {
    width: "22px",
    height: "22px",
    marginLeft: "5px"
}

let styleQty = {
    margin: "5px",
    fontSize: "20px"
}