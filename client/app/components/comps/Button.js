'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';


async function getDatas() {

        const res = await fetch("http://localhost:5000/auth/cookieRemove", { 
        method: 'POST',
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
        
        return  res.json();

}

export default function LoginOrLogut() {
    const btnStyle = {
        border: "none",
        background: "transparent",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
      };
   
    let router = useRouter()

    const handleLogout = async () => {
        await getDatas()
        router.refresh()
        router.push("/")
            
    };



    return (
  
        <button style={btnStyle}  onClick={handleLogout}>Logout</button>
       
    );
    

   

}



