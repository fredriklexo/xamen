import React from "react";

import styleModule from "../products/productCard.module.css"
import ShopNavigation from "../components/navigation/ShopNavigation.js"
import Link from "next/link";


async function getData() {
    const res = await fetch('http://localhost:5000/product/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}

async function getCatData() {
    const res = await fetch('http://localhost:5000/category/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}


export default async function products() {
    let  data  =  await getData();
    let cat = await getCatData()
    
    
   

    return (
     <section className={styleModule.sectionContainer}>
        <ShopNavigation />
        <div className={styleModule.container} >
            <div className={styleModule.wrapper} >

                {data.map((product) => {
                        
                        return(
                            <div key={product._id} className={styleModule.item} >
                                <Link  href={{pathname: "products/" + product.slug  }}>
                                  
                                    <img className={styleModule.productImage} src={product.src} />
                                </Link>
                                <div className={styleModule.productTextContainer}>


                                    <h4 className={styleModule.productName}>{product.name}</h4>

                                    <div className={styleModule.productFlexInfoContainer}>
                                        <img className={styleModule.productIcon} src="/product/icons-coffee-beans.png" ></img>
                                         <p className={styleModule.productCategory}>{product.type}</p>
                                    </div>
                                   
                                    <p className={styleModule.productDec}>{product.features}</p>
                                    <span className={styleModule.productPrice}>{product.price} kr</span>
                                    
                                    
                                </div>
                                {/* <button className={styleModule.buyProductBtn}>buy</button> */}
                            </div>
                        )
                    })
                }

            </div>
        </div>
     </section>
    )
}
