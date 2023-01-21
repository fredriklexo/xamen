
'use client'
import styles from "./changePassword.module.css"
import {useEffect, useState} from "react"
import { useRouter } from 'next/navigation';



async function changePassword(oldPassword, newPassword) {
    const res = await fetch("http://localhost:5000/auth/changePassword", { 
    method: 'POST',
    headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
        {  
            oldPassword,
            newPassword 
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
    const [msg, setMsg] = useState();

    const handleSubmit = async (event) => {
        // Prevent page reload
        event.preventDefault();
        
        var { oldPassword, newPassword, rewriteNewPassword } = document.forms[0];
        

        if(oldPassword.value  && newPassword.value === rewriteNewPassword.value){
            const res = await changePassword(oldPassword.value, newPassword.value)
            console.log(res)
            if(res.status === "success"){
                oldPassword.value = ""
                newPassword.value = ""
                rewriteNewPassword.value = ""
                setErrorMsg("")
                setMsg(res.message)
            }
            if(res.status === "fail"){
                setMsg("")
                setErrorMsg(res.message)
            }
        }else{
            setErrorMsg("password and confirm new password does not match")
        }
    };

  return (
 
        <div className={styles.contentContainer + " secondaryColor"}>
            <div className={styles.headerContainer}>
                <h1>Change password</h1>
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit} >

                <div className={styles.inputContainer}>
                    <label>Old password :</label>
                    <input type="password" name="oldPassword"  required />            
                </div>
                <div className={styles.inputContainer}>
                    <label>New password:</label>
                    <input type="password" name="newPassword" required />
                </div>
                <div className={styles.inputContainer}>
                    <label>Confirme new password:</label>
                    <input type="password" name="rewriteNewPassword" required />
                </div>
                <p className={styles.errorMsg} >{errorMsg}</p>
                <p className={styles.successfullyMsg} >{msg}</p>
                <div className={styles.buttonContainer}>
                    <input className="primaryColor" type="submit" value="Change Password" />
                </div>
            </form>
        </div>
        
        
  )
}

