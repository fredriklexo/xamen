'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


async function getData(id) {

        const res = await fetch("https://xamen-api.vercel.app/cart/cart", { 
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
    const router = useRouter()

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
       
        let response = await getData(props.productid)
        if(response.status === "notAuthorized"){
            router.push("/login")
        }
            
    };



    return (
  
        <button style={btnStyle} onClick={handelClick}>Buy now</button>
       
    );
    

   

}



