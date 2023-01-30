import Link from "next/link"  
import styles from "../policy.module.css"


export default async function orderSuccess() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Terms of use</h1>
        <div className={styles.content}>
          <h2> Information on cookies</h2>
        </div>
      </div>
    </div>
  )
}

