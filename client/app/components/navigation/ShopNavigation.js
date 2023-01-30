import styles from "./ShopNavigation.module.css"
import Link from "next/link";

async function getCategory() {
    const res = await fetch('https://xamen-api.vercel.app/category/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function ShopNavigation() {

    let categoryList = await getCategory()

    return (


        <section className={styles.sectionContainer}>
            <div className={styles.container} >
                <div className={styles.wrapper} >
                    <div className={styles.itemContainer} >
                        <Link className={styles.productLink} href={{ pathname: "products" }}>
                            <img alt="coffee benas icon" style={{ width: "30px" }} src="/product/icons-coffee-beans.png"></img>
                            <h2>All Products</h2>
                        </Link>
                        {categoryList.map(category => {
                            return (
                                
                                    <Link key={category.categoryId} className={styles.productLink} href={{ pathname: "products", query: { category: category.categoryId } }}>
                                        <img alt={category.name} style={{ width: "30px" }} src={category.featuresSrc}></img>
                                        <h2>{category.name}</h2>
                                    </Link>

                                
                            )
                        })
                        }
                    </div>

                </div>
            </div>
        </section>
        
    )
}
