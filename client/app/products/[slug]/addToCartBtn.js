'use client'

import React, { useState, useEffect } from 'react';


async function getData(id) {

        const res = await fetch("http://localhost:5000/cart/cart", { 
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {  
                itemId: id,
                quantity: 1 
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

export default function AddToCartBtn(props) {
    const btnStyle = {
        border: "none",
        background: "transparent",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
        width:"80px",
        height: "40px"
      };
   
    

    const handelClick = async () => {
        console.log("click")
       let test =  await getData(props.productid)
        console.log(test)
            
    };



    return (
  
        <button style={btnStyle} onClick={handelClick}>Buy now</button>
       
    );
    

   

}



