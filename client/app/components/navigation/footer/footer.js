import styles from "./footer.module.css"
import Link from "next/link"


export default function Footer() {
    return (
        <footer className={styles.sectionContainer}>
            <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src='/Starbucks-Logo.png'></img>
                    </div>
                    <div className={styles.infoContainer} >
                        <Link href="/" >About us</Link>
                        <Link href="/" >Contact</Link>
                    </div>
                    <div className={styles.serviceContainer} >
                        <Link href="/" >Privacy Policy</Link>
                        <Link href="/" > Terms of Use</Link>
                        <Link href="/" > FAQ</Link>
                    </div>
                    <div className={styles.tradmarksContainer} >
                        <p>Nestlé uses Starbucks trademarks under license. Keurig, K-Cup, and the Keurig trade dress are trademarks of Keurig Green Mountain, Inc., used with permission. Pike Place is a trademark of The Pike Place Market PDA, used under license. NESPRESSO® is a registered trademark of Société des Produits Nestlé S.A. All other trademarks are the property of their respective owners.</p>
                    </div>
            </div>
        </footer>
    )
}
