import React from "react";

import styleModule from "../products/productCard.module.css"
import ShopNavigation from "../../components/navigation/ShopNavigation.js"
import Link from "next/link";


async function getData() {
    const res = await fetch('https://xamen-api.vercel.app/product/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getProductsByCategory(id) {
    const res = await fetch(`https://xamen-api.vercel.app/product/getByCategory/${id}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


export default async function products(props) {

    // let  data  =  await getData();
    let data = await getProductsByCategory(props.searchParams.category)
   


    return (
        <section className={styleModule.sectionContainer}>
            <ShopNavigation></ShopNavigation>
            <div className={styleModule.container} >
                <div className={styleModule.wrapper} >

                    {data.map((product) => {

                        return (
                            <div key={product._id} className={styleModule.item} >
                                <Link className={styleModule.productLink} href={{ pathname: "products/" + product.slug }}>

                                    <img alt={product.name} className={styleModule.productImage} src={product.src} />
                                </Link>
                                <div className={styleModule.productTextContainer}>
                                    <h4 className={styleModule.productName}>{product.name}</h4>
                                    <div className={styleModule.productFlexInfoContainer}>
                                        <img alt="icon coffe beans" className={styleModule.productIcon} src="/product/icons-coffee-beans.png" ></img>
                                        <p className={styleModule.productCategory}>{product.type}</p>
                                    </div>
                                    <p className={styleModule.productDec}>{product.features}</p>
                                    <span className={styleModule.productPrice}>{product.price} kr</span>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </section>
    )
}
