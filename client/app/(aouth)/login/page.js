
import LoginForm from "./loginForm"
import styles from "./loginModal.module.css"
import Link from "next/link";


export default async function Login({children}) {
  
  


  return(
    <div className={styles.modalContainer}>
      <div className={styles.modalWrapper}>
        <Link className={styles.logoLink} href="/"><img className={styles.logo} src="/logoWhiteText.png" /></Link>
        <div className={styles.triggerContainer}>
              <Link href="/register" className={styles.triggerRegister}>
                  <h5>Register</h5>
              </Link>
              <Link  href="/login" className={styles.triggerLogin} >
                  <h5>Login</h5>
              </Link>
          </div>
        <LoginForm>{ children}</LoginForm>
      
      </div>
      
    </div>
  )
}

