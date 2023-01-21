
import styles from "./success.module.css"
import Link from "next/link";
import { headers } from 'next/headers';
async function getData(id) {
  const res = await fetch("http://localhost:5000/stripe/order/success", { 
  method: 'POST',
  headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
  },
  withCredentials: true, // should be there
  credentials: 'include', // should be there
  body: JSON.stringify({userId: id})
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
  // console.log(props.searchParams)
  // let user = await getData(props.searchParams.session_id)
  // if(user){
  //   var cart = JSON.parse(user.metadata.cart)
  // }
  // console.log(cart.items)
 

  return(
    <div className={styles.modalContainer}>
      <div className={styles.modalWrapper}>
        <h1> Thank you.</h1>
      <h2>Your order was completed successfully.</h2>
      {/* {cart.items.map(item => {
        <div>
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
        </div>
      })} */}
      {/* <p>{cart.bill}</p> */}
      </div>
      
    </div>
  )
}

