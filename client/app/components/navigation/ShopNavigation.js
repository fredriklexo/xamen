import styles from "./ShopNavigation.module.css"



export default function ShopNavigation() {
    return (
     <section className={styles.sectionContainer}>
        <div className={styles.container} >
             <div className={styles.wrapper} >
                <div className={styles.itemContainer} >
                    <h4 className={styles.item}>Blonde Roast</h4>
                    <h4 className={styles.item}>Medium Roast</h4>
                    <h4 className={styles.item}>Dark Roast</h4>
                    <h4 className={styles.item}>Decaf</h4>
                </div>
                
            </div>
        </div>
     </section>
    )
}
