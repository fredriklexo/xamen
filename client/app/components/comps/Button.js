'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';


async function getDatas() {

        const res = await fetch("https://xamen-api.vercel.app/auth/cookieRemove", { 
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
async function checkIfUserIsLogedIn() {

    const res = await fetch("https://xamen-api.vercel.app/auth/cookie/verifyTooken", { 
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
    
    return  res.json();

}

export default function LoginOrLogut() {
    let router = useRouter()
   
    const [user, setUser] = useState(false);


    const btnStyle = {
        border: "none",
        background: "transparent",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
      };
   
    

    const handleLogout = async () => {
        let foo = await getDatas()
        if(foo.status == "success"){
            router.refresh()
            const toggleNavbar = document.getElementById("mobileNavigation")
            toggleNavbar.classList.remove("mobileNavigation_container__4jbbd")
            router.push("/") 
        }
    };

    async function validateUser() {
        let user = await checkIfUserIsLogedIn()
        
        if(user.status == "notAuthorized"){
            setUser(false)
            console.log("user is set:",user)
        }

        if (user.status === "success") {
            setUser(true)
            console.log("user is set:",user)
        }
       
      
    };
    useEffect(() => {
        validateUser()
        
    },[]);


    return (
        <>
            {(user) ?        
            <>
                <button style={btnStyle}  onClick={handleLogout}><p>Logout</p></button> 
                <Link href="/profile" ><img className="profileIcon" alt="person icon"  src="/icons/person.svg"></img></Link>
            </>
            
            :undefined
            }
            
            {(!user) ?   <Link href="/login"><p>Login</p> </Link> : undefined}
           
         
        </>
    );
    

   

}


