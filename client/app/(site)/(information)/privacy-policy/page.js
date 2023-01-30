import Link from "next/link"  
import styles from "./policy.module.css"


export default async function orderSuccess() {

  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Privacy policy</h1>
        <div className={styles.content}>
          <h2> Information on cookies</h2>
          <p>You can find out which cookies we use here. For an overview of all the cookies we use please click <Link href="/privacy-policy/cookies">here</Link></p>
          <h2>When will my data be deleted?</h2>
          <p>We will store your personal data as long as is necessary for the purposes named in this Privacy Notice, especially for the fulfilment of our contractual and legal obligations. We may also store your personal data for other purposes if or as long as the law allows us store it for particular purposes, including for defence against legal claims.</p>
          <h2>Info on websites and apps</h2>
          <p>We use your data to provide access to the Fakesite websites and apps. Along with the device and access data collected whenever you use these services, the type of data processed as well as the processing purposes depend especially on how you use the functions and services provided via our services. We also use the data collected when you use our services to find out how our online offering is used. We use this information and other information in the course of shopping personalisation to improve our services and for personalised advertising.</p>
          <h2>Which data does Fakesite process?</h2>
          <p>Fakesite offers you a wide range of services, which you can also use in a wide range of ways. Depending on whether you contact us online, by phone or otherwise and on which services you use, various data from different sources may come into play. Much of the data we process is provided by you yourself when you use our services or contact us, for example when you register and provide your name or email address or address. We do, however, also receive technical device and access data which is automatically collected when you interact with our services. This may, for example, be information on which device you are using. We collect further data using our own data analyses (e.g. within the framework of market research studies and customer evaluations). We may also receive data on you from third parties, for example for credit rating agencies and payment service providers.</p>
        </div>
      </div>
    </div>
  )
}

