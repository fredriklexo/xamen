'use client'
import styles from "./myDetails.module.css"
import { useEffect, useState } from "react"
import Link from "next/link";


async function getData() {
    const res = await fetch(`https://xamen-api.vercel.app/auth/getUser/details`, {
        method: 'GET',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: 'include' // should be there
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary

    }

    return res.json();
}
async function uppdateUserDetails(mail, firstName, lastName) {
    const res = await fetch("https://xamen-api.vercel.app/auth/updateUser/details", { 
    method: 'POST',
    headers: {
        Accept: "applicaiton/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(
        {  
            mail: mail,
            firstName: firstName,
            lastName:lastName,
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
export default function myOrder() {
    
    const [userDetails, setUserDetails] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [msg, setMsg] = useState("");


    const fetchData = async () => {
        let response = await getData()
        console.log(response)
        if (response.status === "success") {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setMail(response.data.mail)
            setUserDetails(response.data)
            
            
            
            
        }
        if (response.status === "fail") {
            setErrorMsg(response.message    )
            setMsg("")
            return setUserDetails(response.data)

        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = false
        if(userDetails.firstName != firstName || userDetails.lastName != lastName || userDetails.mail != mail){
            
            response = await uppdateUserDetails(mail,firstName,lastName)
            console.log(response)
        }
        
        if(response){
            if(response.status === "success"){
    
                setMsg(response.message)
            }else{
                setErrorMsg(response.message)
            }

        }
       

    };


    useEffect(() => {
       
        fetchData()
        if(userDetails){
            setFirstName(userDetails.firstName)
            setLastName(userDetails.firstName)
            setMail(userDetails.mail)
            
         }
         


    }, [])

    
    return (
        <div className={styles.contentContainer + " secondaryColor"}>
            
                    <div className={styles.headerContainer}>
                        <h1 >My details</h1>
                    </div>

                    <div>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <div className={styles.inputContainer}>
                                <label>First name:</label>
                                <input value={firstName}  type="name" name="firstName" onChange={e => setFirstName(e.target.value)} />
                            
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Last name:</label>
                                <input value={lastName}   type="name"  name="lastName" onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Email:</label>
                                <input value={mail}   type="email"  name="mail" onChange={e => setMail(e.target.value)} />
                            </div>
                            <p className={styles.errorMsg} >{errorMsg}</p>
                            <p className={styles.successfullyMsg} >{msg}</p>
                            <div className={styles.buttonContainer}>
                                <input className={"primaryColor"} type="submit" value="Change details" />
                            </div>
                            
                        </form>
                    </div>
         </div>
    )
}

