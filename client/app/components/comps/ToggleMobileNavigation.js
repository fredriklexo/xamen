
'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import MobileNavigation from "../navigation/mobile/MobileNavigation.js"





export default function ToggleMobileNavigation(children) {
   
   
    const [toggle, setToggle] = useState(true)
    
    const handleLogout = async () => {
        const nabBar = document.getElementById("mobileNavigation")
            
            nabBar.classList.toggle("navMenuToggle")
      
    };
   

    return (

        <img  className="toggleButton" onClick={handleLogout} style={{ width: "25px", height:"25px" }}  src="/icons/menu.png"></img>
        
    );
    

   

}



