import Checkout from "./cart.js"
import cartStyles from "./cart.module.css"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function cart({children}) {
    const nextCookies = cookies();
    const userIsValidated = nextCookies.has('accessToken');
    if(!userIsValidated){
        redirect("/login")
    }
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
