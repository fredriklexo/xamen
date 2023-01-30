
import styles from "./profile.module.css"
import Link from "next/link";

export default async function Login({ children }) {

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentWrapper}>
                <img alt="profile banner2" className={styles.profileImg} src="/banners/profile-banner2.jpg"></img>
                <div className={styles.contentText}>
                    <h1>Welcome</h1>
                    <h2>To your profile page</h2>
                </div>
            </div>

        </div>
    )
}

