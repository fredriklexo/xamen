
import styles from "./contact.module.css"

import Link from "next/link"  

export default async function orderSuccess() {

  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>

      <div className={styles.wrapper}>
        <div className={styles.itemContainer}>
          <div className={styles.headerContainer}>
            <h1>Contact Us</h1>
            <p>If you didn't find your answer in our <Link href="/faq" >FAQ</Link>, please feel free to contact one of the departments listed below. Simply click on the appropriate link and send us your questions, concerns and/or feedback.</p>
          </div>
          <div className={styles.item}>
         
            <div className={styles.infocontainer}>
              <h2>Email</h2>
              <p>fakesite@mail.com </p>
            </div>
            

          </div>
          <div className={styles.item}>
         
            <div className={styles.infocontainer}>
              <h2>Address</h2>
              <p>Sweden, Fakeadress 1337, 123 45 Gothenburg.</p>
            </div>
            

          </div>
          
          <div className={styles.item}>
        
            <div className={styles.infocontainer}>
              <h2>Holiday Closures</h2>
              <p>Our Customer Contact Center will be closed to observe the following US Holidays:</p>
              <p>New Years Day</p>
              <p>Memorial Day</p>
              <p>Independence Day</p>
              <p>Labor Day</p>
              <p>Thanksgiving</p>
              <p>Christmas</p>
            </div>

          </div>

        </div>

        <div>
        </div>
      </div>

    </div>
  )
}

