
import styles from "./success.module.css"
import { redirect } from 'next/navigation';
async function getData(id) {
  const res = await fetch("https://xamen-api.vercel.app/stripe/order/success", { 
  method: 'POST',
  headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
  },
  withCredentials: true, // should be there
  credentials: 'include', // should be there
  body: JSON.stringify({sessionId: id})
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    
  }
  
  return  res.json();
}


export default async function orderSuccess(props) {
  // let order = await getData(props.searchParams.session_id)
  // // if(props.searchParams.session_id){
  
  // //       var order = await getData(props.searchParams.session_id)
  // //       console.log(order)
   
  // // }else{
  // //   // redirect("/")
  // // }
  
  // console.log("Mr order:",order)
  
     
  
  
 

  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1> Thank you.</h1>
        <h2>Your order was completed successfully.</h2>
        <p>You can find your order in your user profile</p>
      </div>
      
    </div>
  )
}

