import Link from "next/link";
import style from "./subMenu.module.css"

async function SubMenu(){

    return(
        <nav className={style.container}>
            <div className={style.left}>
                Logoo
            </div>

            <div className={style.main}>
                <Link href="/" >Home</Link>
                <Link href="/cart" >Cart</Link>
            </div>

            <div className={style.right}>
                
                <div>poodawddwwaddwadwadwadwdwdawp</div>
               
            </div>
        </nav>
        
    )

}

export default MainNavigation