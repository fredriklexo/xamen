import styles from "./footer.module.css"



export default function Footer() {
    return (
        <footer className={styles.sectionContainer}>
            <div className={styles.container}>
                

                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src='/Starbucks-Logo.png'></img>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.column} >
                            <h4>Looooooorem</h4>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                        </div>
                        <div className={styles.column} >
                            <h4>Looooooorem</h4>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                        </div>
                        <div className={styles.column} >
                            <h4>Looooooorem</h4>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                            <p>lorem ipsum</p>
                        </div>
                    </div>
             
            </div>
        </footer>
    )
}
