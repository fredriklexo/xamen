import Checkout from "./cart.js"
import cartStyles from "./cart.module.css"

export default function cart({children}) {
    return (
        <section className={cartStyles.sectionContainer}>
            <div className={cartStyles.container} >
                <div className={cartStyles.wrapper } >
            
                    <div className={cartStyles.cartContainer}>
                        

                        <Checkout>{{children}}</Checkout>
                       

                  
                    </div>
                </div>
            </div>
        </section>
    )
}
