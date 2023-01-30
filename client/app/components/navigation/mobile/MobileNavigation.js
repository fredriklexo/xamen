"use client"
import style from "./mobileNavigation.module.css"
import Link from "next/link";
import ToggleMobileNavigation from "../../comps/ToggleMobileNavigation.js"
import { useRouter } from 'next/navigation';
import LoginOrLogut from "../../comps/Button.js"
import React, { useState, useEffect } from 'react'

async function getCategory() {
    const res = await fetch('http://localhost:5000/category/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
async function verifyToken() {
    const res = await fetch('http://localhost:5000/auth/cookie/verifyTooken', {
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

export default function MobileNavigation() {
    
    const router = useRouter();

    const [user, setUser] = useState(false)
    const [toggle, setToggle] = useState(true)
    const [subCategoryList, setsubCategoryList] = useState([])

    const handelToggle = async () => {
        const toggleNavbar = document.getElementById("mobileNavigation")
        toggleNavbar.classList.toggle(style.container)

    };


    let fetchData = async () => {
        let tooken = await verifyToken()
        
        if (tooken.status == "success") {
            setUser(true)
        } else {
            setUser(false)
            setToggle(false)
        }
        const data = await getCategory()
        setsubCategoryList(data)



    }
    useEffect(() => {

        fetchData()
        
    }, [])

    return (

        <>
            <img alt="mobilemenu icon" className="toggleButton" onClick={() => {handelToggle(),fetchData()}} style={{ width: "25px", height: "25px" }} src="/icons/menu.png"></img>

            <div className={style.mobilNavContainer} id="mobileNavigation" >


                <div className={style.mainNavigationContainer}>
                    <div className={style.mainNavigation}>
                        <div className={style.button} onClick={() => { router.push("/"), handelToggle() }}><img className={style.logo} src="/logoWhiteText.png" /></div>
                        <img alt="mobilemenu icon" className="toggleButton" onClick={handelToggle} style={{ width: "25px", height: "25px" }} src="/icons/menu.png"></img>

                    </div>
                </div>
                <div className={style.subNavigationContainer}>

                    {(user) ?
                        <>
                            <LoginOrLogut  />
                            <div onClick={() => { router.push("/profile"), handelToggle() }}>
                                <img alt="person icon" className={style.subIcon} src="/icons/person.svg"></img>
                            </div>
                        </>
                        : <div onClick={() => { router.push("/login"), handelToggle() }}>
                            <p>Login</p>
                        </div>}

                    <div className={style.button} onClick={() => { router.push("/cart"), handelToggle() }} >
                        <img alt="coffee icon" className={style.subIcon} src="/icons/coffee.svg"></img>
                    </div>

                </div>

                <div className={style.content}>

                    <div className={style.productContainer}>
                        <div className={style.subCategoryButton} onClick={() => setToggle(!toggle)} >Products</div>
                        <div className={style.subCategory}>


                            {!toggle && (
                                <div className={style.subCategoryButton} onClick={() => { router.push("/products"), handelToggle() }}>
                                    <img alt="cofee beans icon" style={{ width: "20px" }} src={"/product/icons-coffee-beans.png"}></img>
                                    <p>All products</p>
                                </div>
                            )
                            }
                            {!toggle && subCategoryList.map(item => {

                                return (
                                    <div key={item.categoryId} className={style.subCategoryButton} onClick={() => { router.push(`/products?category=${item.categoryId}`), handelToggle() }} >
                                        <img alt={item.name} style={{ width: "20px" }} src={item.featuresSrc}></img>
                                        <p>{item.name}</p>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>


            </div>

        </>

    )
}
