

import Link from "next/link";
import style from "./MainNavigation.module.css"
import { cookies } from 'next/headers';
import LoginOrLogut from "../comps/Button.js"



async function MainNavigation(){

    const nextCookies = cookies();
    const userIsValidated = nextCookies.has('accessToken');
    
    return(
        <nav className={style.container}>
            <div className={style.left}>
                <Link href="/"><img src="/logoWhiteText.png" className={style.logo}/></Link>
            </div>

            <div className={style.main}>
                <Link href="/products" >Products</Link>
            </div>

            <div className={style.subMenu}>
                <Link href="/" >Home</Link>
                <Link href="/cart" >Cart</Link>
            </div>

            <div className={style.right}>

                
                
               { (userIsValidated) ? <LoginOrLogut token={"hej"} /> :  <Link href="/login">Login </Link> }
                <Link href="/cart">Cart</Link>
            </div>
        </nav>

    )

}

export default MainNavigation

