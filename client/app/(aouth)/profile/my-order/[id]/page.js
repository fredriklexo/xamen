'use client'
import styles from "./order.module.css"
import { useEffect, useState } from "react"
import Link from "next/link";
async function getData(id) {
    const res = await fetch(`https://xamen-api.vercel.app/order/getOrderById/${id}`, {
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

export default function myOrder({params }) {
    
    const [order, setOrder] = useState();
    const [shipping, setShipping] = useState();
    const [products, setProducts] = useState();

    const fetchData = async () => {
        let response = await getData(params.id)
        console.log(response)
        if (response.status === "success") {
            setShipping(response.data.shipping)
            setProducts(response.data.product)
            return setOrder(response.data)
        }

        if (response.status === "fail") {
            console.log("wtf")
            setShipping(response.data)
            setProducts(response.data)
            return setOrder(response.data)

        }

    };

    useEffect(() => {
       
        fetchData()

    }, [])

    
    return (
        <>
        {(order) ? 
            <div className={styles.container}>
                <div>
                    <h1 >ORDER INFORMATION</h1>
                    <p>Thanks for your order! Check the information below.</p>
                </div>

                <div>
                    <div className={styles.flexbox}>
                        <p>ORDER NUMBER:</p>
                        <p>{order._id} </p>
                    </div>
                    <div className={styles.flexbox}>
                        <p>ORDER DATE:</p>
                        <p>{order.createdAt}</p>
                    </div>
                </div>

                <div>
                    <p>DELIVERY ADDRESS:</p>
                    <div className={styles.shippingContainer}>
                        <p>{shipping.name}</p>
                        <p>{shipping.email}</p>
                        <p>{shipping.phone}</p>
                        <p>{shipping.address.city}</p>
                        <p>{shipping.address.postal_code}</p>
                        <p>{shipping.address.line1}</p>
                    </div>
                </div>
                <div>
                    <p>ORDER ITEMS</p>
                    <div className={styles.productContainer}>
                        {products.map(product => {

                            return(
                                <div className={styles.productItem} key={product._id}>
                                    <img className={styles.productImg} src={product.src}></img>
                                    <p>{product.name}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>{product.price} sek</p>
                                </div>
                            )

                        })}
                    </div>
                </div>
                <div>
                    <p>PAYMENT INFORMATION</p>
                </div>
                <div>
                    <p>PAYMENT INFORMATION ORDER TOTAL AMOUNT</p>
                    <div>
                        <div className={styles.flexbox}>
                            <p>Subtotal</p>
                            <p>{order.subTotal} sek</p>

                        </div>
                        <div className={styles.flexbox}>
                            <p>Total</p>
                            <p>{order.total} sek</p>

                        </div>
                    </div>
                </div>
                
                    
            </div>
        : undefined}
        </>
    )
}

