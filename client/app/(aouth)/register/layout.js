

import styles from "./loginModal.module.css"




export default function loginLayout({ children }) {

  return (
   
        <div className={styles.loginContainer}>
          <div className={styles.loginWrapper}>
              {children}
          </div>
        </div>
  )
}

