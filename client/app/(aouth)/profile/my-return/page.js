'use client'
import styles from "./myReturn.module.css"
import { useEffect, useState } from "react"
import Link from "next/link";
async function getData() {
    const res = await fetch('https://xamen-api.vercel.app/order/getUserOrder', {
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

export default function myOrder({ }) {

    const [orders, setOrders] = useState([]);
    const [productLeght, setProductLeght] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            let response = await getData()
           
            if (response.status === "success") {
                console.log(response.data[0])
                // setProductLeght(response.data)
                return setOrders(response.data)
            }

            if (response.status === "fail") {
                console.log("wtf")
                return setOrders(response.data)

            }

        };
        fetchData()

    }, [])

    

    return (
        <div className={styles.contentContainer }>
            <h1 className={styles.header}>My return</h1>
        
            {(orders) ?orders.map(order => {
                let test = order.product.length
                
                
                    return (
                    
                            <div className={styles.orderContainer} key={order._id}>

                                <p>Delivery status:{order.delivery_status}</p>
                                <div className={styles.orderItemContainer} >
                                {(order.product.length = 2) ? order.product.map(item => {
                                        return (
                                           
                                            <Link key={item._id}  href={`profile/my-order/${order._id}`}>
                                                <img alt={item.name} className={styles.img} src={item.src} />
                                            </Link>
                                           
                                        )
                                }): undefined}
                                {(order.product.length === 2 && test > 3 ) ? 
                                    <Link className={styles.orderItemCounter + " primaryColor"} href={`profile/my-order/${order._id}`}>
                                        + {test - order.product.length}
                                    </Link>: undefined
                                }
                               
                                 </div>
                                <p>Ordernumber: {order._id}</p>
                                <div className={styles.triggerContainer}>
                                    <Link className={styles.trigger + " primaryColor"} href={`profile/my-order/${order._id}`}>
                                            Show order
                                    </Link>
                                    <Link className={styles.trigger + " primaryColor"} href={`profile/my-order/${order._id}`}>
                                            Create return
                                    </Link>

                                </div>
                            </div>
                      
                    )

                }): undefined}
                
        </div>
    )
}

