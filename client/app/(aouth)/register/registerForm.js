
'use client'
import styles from "./loginModal.module.css"
import {useEffect, useState} from "react"

async function validateUser(name, pass) {
    const res = await fetch("http://localhost:5000/user/login", { 
    method: 'POST',
    
    headers: {
      'Content-Type': 'application/json'  
    },
    body: JSON.stringify(
        {  
            mail: name,
            password: pass 
        }
    )
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
const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
    var { mail, pass } = document.forms[0];
    console.log(mail.value)
    let test = await validateUser(mail.value, pass.value)
    console.log(test)
  };

export default  function RegisterForm() {
   
   
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
          <label>Adress:</label>
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
          <input type="submit" />
      </div>
  </form>

        
        
  )
}

