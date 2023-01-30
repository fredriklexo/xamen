import Link from "next/link"  
import styles from "./faq.module.css"


export default async function orderSuccess(props) {
  let data = false
  // Profile FAQ
  if(props.params.query === "how-do-i-reset-my-password") data = {title: "How do I reset my password?", content: "If you've forgotten your password, you can just click on 'Forgotten your password?' on the login screen. You'll need to enter your email address and hit send to receive an email with a link in it (please note: this email may take some time to reach you and could appear in your spam / junk folder). Click on the link in the reset email when you receive it, and you'll be prompted to enter a new password. You can then use the new password to login to your fakesite account."}
  if(props.params.query === "do-i-need-to-create-a-fakesite-account-to-order") data = {title: "Do I need to create a Fakesite account to order?", content: "To place an order, you need to have a registered account at fakesite.co.uk. It’s really easy to create one and means you won’t have to fill in your details every time you shop with us. You will be prompted to create an account when you place your first order, just follow the easy on-screen steps."}
  if(props.params.query === "how-do-i-create-an-account") data = {title: "How do I create an account?", content: "Registering a fakesite account with us is quick and easy. Just follow these simple steps and you'll soon be ready to order. 2. Enter your email address under 'I am a new customer' and click on 'Next'. Then complete all fields marked with an asterisk *.3. Once you've completed the registration, you will receive a confirmation email. We suggest that you check the information in this email carefully, making sure it is correct. To confirm your registration, click on the link provided in the email. Once your registration has been confirmed, you can login and start shopping.1. Click the login icon which can be found on the top right-hand corner of your screen."}
  if(props.params.query === "how-do-i-log-in-to-my-account") data = {title: "How do I log in to my account?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  // Order FAQ
  if(props.params.query === "how-do-i-search-for-a-specific-item") data = {title: "How do I search for a specific item?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  if(props.params.query === "how-can-i-place-an-order") data = {title: "How can I place an order?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  if(props.params.query === "what-if-an-item-is-out-of-stock") data = {title: "What if an item is out of stock?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}

  // Refunds FAQ
  if(props.params.query === "how-do-i-return-my-order") data = {title: "How do I return my order?", content: "If it’s not a fit, you have 100 days to return your unworn items - FREE. You can: go to Profile in the right corner. Go to order and press the return button."}
  if(props.params.query === "when-will-i-receive-my-refund") data = {title: "When will I receive my refund?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  if(props.params.query === "what-if-my-item-is-damage-or-defective") data = {title: "What if my item is damaged or defective?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  
  // Delivery FAQ
  if(props.params.query === "where-is-my-order") data = {title: "Where is my order?", content: "We will inform you about the expected delivery time of your order in checkout and in your order confirmation email - this time may vary according to the selected items and the shipping method."}
  if(props.params.query === "what-deliver-options-are-available") data = {title: "What delivery options are available?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  if(props.params.query === "do-delivery-and-returns-cost-anything") data = {title: "Do delivery and returns cost anything?", content: "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"}
  
  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>
      <div className={styles.wrapper}>
        <Link href={"/faq"}>FAQ</Link>
        {(data) ? <h1>{data.title}</h1>:<h1>Sorry the link is broken :(</h1>}
        <div className={styles.content}>

            {(data) ? 
              <p>{data.content}</p>
              
              :
              <p>Please go to <Link href={"/faq"}>FAQ</Link> to find what you need.</p>
            }



        </div>
      </div>
    </div>
  )
}

