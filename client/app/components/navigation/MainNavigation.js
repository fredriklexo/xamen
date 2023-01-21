

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
                <Link href="/cart" ><img src="/icons/coffee.svg"></img></Link>
            </div>

            <div className={style.right}>

                
                
               { (userIsValidated) ? 
               <>
               <LoginOrLogut token={"hej"} /> 
               <Link href="/profile" ><img className={style.icon} src="/icons/person.svg"></img></Link>
               </>
               :  <Link href="/login">Login </Link> }
               
               <Link href="/cart" ><img className={style.icon} src="/icons/coffee.svg"></img></Link>
            </div>
        </nav>

    )

}

export default MainNavigation

