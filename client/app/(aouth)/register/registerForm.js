
'use client'
import styles from "./loginModal.module.css"
import {useEffect, useState} from "react"
import { useRouter } from 'next/navigation';

async function validateUser(mail,fname,lname,address,zip,password) {
    const res = await fetch("http://localhost:5000/user/register", { 
    method: 'POST',
    headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
        {  
            firstName: fname,
            lastName: lname,
            mail: mail,
            address: address,
            zip: zip,
            password: password,
             
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
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}


export default  function RegisterForm() {
    let router = useRouter()

    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async (event) => {
        // Prevent page reload
        event.preventDefault();
        let {mail,fname,lname,address,zip,password,confirm} = event.target
        if(password.value === confirm.value){
            let newUser = await validateUser(mail.value,fname.value,lname.value,address.value,zip.value,password.value) 
            console.log(newUser.accessToken)
            if(newUser.accessToken){
                router.refresh()
                router.push("/")
            }else{
                setErrorMsg("* incorrect email or password")
            }
        }
        // let test = await validateUser()
        
    };
  return (
  
  <form className={styles.formContainer} onSubmit={handleSubmit}>

      <div className={styles.inputContainer}>
          <label>E-mailadres:</label>
          <input type="text" name="mail" required />            
      </div>
      
      <div className={styles.inputContainer}>
          <label>First name:</label>
          <input type="text" name="fname" required />            
      </div>

      <div className={styles.inputContainer}>
          <label>Last name:</label>
          <input type="text" name="lname" required />            
      </div>
      <div className={styles.inputContainer}>
          <label>Address:</label>
          <input type="text" name="address" required />            
      </div>
      <div className={styles.inputContainer}>
          <label>Zip-code:</label>
          <input type="text" name="zip" required />            
      </div>

      <div className={styles.inputContainer}>
          <label>Password:</label>
          <input type="password" name="password" required />
      </div>
      <div className={styles.inputContainer}>
          <label>Confirm password:</label>
          <input type="password" name="confirm" required />
      </div>
      
      <div className={styles.buttonContainer}>
          <input className={"primaryColor"} type="submit" />
      </div>
  </form>

        
        
  )
}

