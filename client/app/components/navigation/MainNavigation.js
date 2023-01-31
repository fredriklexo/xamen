

import Link from "next/link";
import style from "./MainNavigation.module.css"
import { cookies } from 'next/headers';
import LoginOrLogut from "../comps/Button.js"
import MobileNavigation from "./mobile/MobileNavigation.js"

async function MainNavigation(children){

   
    return(
        <nav className={style.container}>
            <div className={style.left}>
                <Link href="/"><img alt="logo white text" src="/logoWhiteText.png" className={style.logo}/></Link>
            </div>

            <div className={style.middel}>
                <Link href="/products" >Products</Link>
            </div>

            <div className={style.subMenu}>
                <Link href="/" >Home</Link>
                <Link href="/cart" ><img alt="coffee icon" src="/icons/coffee.svg"></img></Link>
            </div>

            <div className={style.right}>
                
               <LoginOrLogut>{children}</LoginOrLogut> 
               <Link href="/cart" ><img alt="coffee icon" className={style.icon} src="/icons/coffee.svg"></img></Link>
            </div>
            
            <MobileNavigation>{children}</MobileNavigation>
           
        </nav>

    )

}

export default MainNavigation

