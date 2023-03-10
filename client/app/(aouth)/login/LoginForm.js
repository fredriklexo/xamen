
'use client'
import styles from "./loginModal.module.css"
import {useEffect, useState} from "react"
import { useRouter } from 'next/navigation';



async function validateUser(name, pass) {
    const res = await fetch("https://xamen-api.vercel.app/user/login", { 
    method: 'POST',
    headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
        {  
            mail: name,
            password: pass 
        }
    ),
    withCredentials: true, // should be there
    credentials: 'include' // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    
    
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      
    }
    
    return  res.json();
}



export default  function LoginForm() {
    
    let router = useRouter()

    const [errorMsg, setErrorMsg] = useState();


    const handleSubmit = async (event) => {
        // Prevent page reload
        event.preventDefault();
        
        var { mail, pass } = document.forms[0];
        
        let res = await validateUser(mail.value, pass.value)
        // console.log(test)
        if(res.accessToken){
            router.refresh()
            router.back()
        }else{
            setErrorMsg("* incorrect email or password")
        }
    };

  return (
 
      

        <form className={styles.formContainer } onSubmit={handleSubmit} >

            <div className={styles.inputContainer}>
                <label>E-mailadres:</label>
                <input type="email" name="mail" pattern="(\w\.?)+@[\w\.-]+\.\w{2,}" required />            
            </div>

            <div className={styles.inputContainer}>
                <label>Password:</label>
                <input type="password" name="pass" required />
            </div>
            <p className={styles.errorMsg} >{errorMsg}</p>
            <div className={styles.buttonContainer}>
                <input className={"primaryColor"} type="submit" value="Loggin" />
            </div>
        </form>

        
        
  )
}

