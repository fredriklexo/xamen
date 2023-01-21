
import RegisterForm from "./registerForm"
import styles from "./loginModal.module.css"
import Link from "next/link";

export default async function Login({children}) {
  
  return(
    <div className={styles.modalContainer +" primaryColor" }>
      
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper + " secondaryColor"}>
        <Link className={styles.logoLink} href="/"><img className={styles.logo} src="/logoWhiteText.png" /></Link>
        <div className={styles.triggerContainer}>
          <Link href="/register" className={styles.triggerRegister + " primaryColor"}>
            <h5>Register</h5>
          </Link>
          <Link href="/login" className={styles.triggerLogin + " primaryColor"} >
            <h5>Login</h5>
          </Link>
        </div>
        <RegisterForm>{children}</RegisterForm>
      </div>
    </div>
  </div>
  )
}

