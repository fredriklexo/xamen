import CartMrFoo from "./cartItem.js"
import cartStyles from "../cart/cart.module.css"

export default function cart({children}) {
    return (
        <section className={cartStyles.sectionContainer}>
            <div className={cartStyles.container} >
                <div className={cartStyles.wrapper} >
                    <h1>Your cart</h1>
                    <div className={cartStyles.cartContainer}>
                        

                        <CartMrFoo>{{children}}</CartMrFoo>
                       

                  
                    </div>
                </div>
            </div>
        </section>
    )
}
