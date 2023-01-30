

import styles from "./profile.module.css"
import Link from "next/link";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default function loginLayout({ children }) {
    const nextCookies = cookies();
    const userIsValidated = nextCookies.has('accessToken');
    if(!userIsValidated){
        redirect("/")
    }
  return (
   
    <div className={styles.container}>
    <div className={styles.wrapper}>

        <div className={styles.navContainer}>
            <div className={styles.navWrapper +" secondaryColor"}>
                <div className={styles.welcomeContainer} >
                    <img alt="coffee icon" src="/icons/coffee.svg" />
                    <div className={styles.welcomeItem}>
                        <h2>Hello</h2>
                        <h3>Coffee Lover</h3>
                    </div>
                </div>
                <div className={styles.profileContainer}>
                    <Link href="/profile/my-details" className={styles.item}><img alt="person icon" src="/icons/person.svg" /><p>My Details</p></Link>
                    <Link href="/profile/change-password" className={styles.item}> <img alt="password icon" src="/icons/password.png" /><p>Change Password</p></Link>
                    <Link href="/profile/my-order" className={styles.item}> <img alt="myorder icon" src="/icons/myorder.png" /><p>My Order</p></Link>
                    <Link href="/profile/my-return" className={styles.item}><img alt="return icon" src="/icons/return.png" /><p>My Return</p></Link>
                </div>
                <div className={styles.helpContainer}>
                    <Link href="/faq" className={styles.item}> <img alt="question icon" src="/icons/question.png" /><p>Do you need help?</p></Link>
                    <Link href={{pathname:"/faq/" + "where-is-my-order"}} className={styles.item}>  <img alt="interface icon" src="/icons/interface.png" /> <p>Where is my order?</p></Link>
                    <Link href={{pathname:"/faq/" + "how-do-i-return-my-order"}} className={styles.item}> <img alt="interface icon" src="/icons/interface.png" /><p>How do I return my order?</p></Link>
                </div>
            </div>
        </div>

        <div className={styles.contentContainer } >
            {children}
        </div>
    </div>
</div>
  )
}

