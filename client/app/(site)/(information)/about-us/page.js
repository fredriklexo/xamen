
import styles from "./aboutUs.module.css"

import Link from "next/link"  

export default async function orderSuccess() {

  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>

      <div className={styles.wrapper}>
        <div className={styles.itemContainer}>
          <div className={styles.headerContainer}>
            <h1>About the Company.</h1>
     
          </div>
          <div className={styles.item}>
         
            <div className={styles.infocontainer}>
              <h2>We Believe in the Pursuit of Doing Good</h2>
              <p>As it has been from the beginning, our purpose goes far beyond profit. We believe Starbucks can, and should, have a positive impact on the communities we serve.</p>
            </div>

          </div>
          <div className={styles.item}>
        
            <div className={styles.infocontainer}>
              <h2>Planet</h2>
              <p>We are striving to become resource positive – giving back more than we take from the planet. We are working to store more carbon than we emit, replenish more freshwater than we use, and eliminate waste. We know we can’t do it alone. It takes all of us.</p>
            </div>

          </div>

        </div>

        <div>
        </div>
      </div>

    </div>
  )
}

