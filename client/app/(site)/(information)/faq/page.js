import Link from "next/link"  
import styles from "./faq.module.css"


export default async function orderSuccess() {

  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>FAQ</h1>
        <div className={styles.content}>
          <div className={styles.item}>
            <img src="/icons/person.svg" alt="Profile icon"></img>
            <h2>Profile</h2>
              <div className={styles.itemLinkContainer}>
                <Link href={{pathname:"/faq/" + "how-do-i-reset-my-password"}}>How do I reset my password?</Link>
                <Link href={{pathname:"/faq/" + "do-i-need-to-create-a-fakesite-account-to-order"}}> Do I need to create a Fakesite account to order?</Link>
                <Link href={{pathname:"/faq/" + "how-do-i-create-an-account"}}>How do I create an account?</Link>
                <Link href={{pathname:"/faq/" + "how-do-i-log-in-to-my-account"}}>How do I log in to my account?</Link>
              </div>
          </div>
          <div className={styles.item}>
            <img src="/icons/myorder.png" alt="My order icon"></img>
            <h2>Order</h2>
            <div className={styles.itemLinkContainer}>
                <Link href={{pathname:"/faq/" + "how-do-i-search-for-a-specific-item"}}>How do I search for a specific item?</Link>
                <Link href={{pathname:"/faq/" + "how-can-i-place-an-order"}}>How can I place an order?</Link>
                <Link href={{pathname:"/faq/" + "what-if-an-item-is-out-of-stock"}}>What if an item is out of stock?</Link>
              </div>
          </div>
          <div className={styles.item}>
            <img src="/icons/return.png" alt="My order icon"></img>
            <h2>Returns &amp; Refunds</h2>
            <div className={styles.itemLinkContainer}>
                <Link href={{pathname:"/faq/" + "how-do-i-return-my-order"}}>How do I return my order?</Link>
                <Link href={{pathname:"/faq/" + "when-will-i-receive-my-refund"}}>When will I receive my refund?</Link>
                <Link href={{pathname:"/faq/" + "what-if-my-item-is-damage-or-defective"}}>What if my item is damaged or defective?</Link>
              </div>
          </div>
          <div className={styles.item}>
            <img src="/icons/info.png" alt="My delivery icon"></img>
            <h2>Delivery</h2>
            <div className={styles.itemLinkContainer}>
                <Link href={{pathname:"/faq/" + "where-is-my-order"}}>Where is my order?</Link>
                <Link href={{pathname:"/faq/" + "what-deliver-options-are-available"}}> What delivery options are available?</Link>
                <Link href={{pathname:"/faq/" + "do-delivery-and-returns-cost-anything"}}>Do delivery and returns cost anything?</Link>
              
              </div>
          </div>




        </div>
      </div>
    </div>
  )
}

