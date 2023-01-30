
import styles from "./tou.module.css"

async function getData() {
  const res = await fetch("https://xamen-api.vercel.app/stripe/order/success", {
    method: 'POST',
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    withCredentials: true, // should be there
    credentials: 'include', // should be there
    body: JSON.stringify({ sessionId: id })
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.


  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

  }

  return res.json();
}


export default async function orderSuccess() {









  return (
    <div className={styles.container}>
      <img className={styles.blob} src="/blob3.svg" alt="Blob for design"></img>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Terms of use</h1>
        <div className={styles.content}>
          <h2> The legal bits…</h2>
          <p>
            You are entering into this agreement with:

            fakeSite.com Limited “we”, “us”; and
            fakeSite Payments UK Limited “fakeSite Payments”.
            We and fakeSite Payments are both companies registered in England and Wales, with registered addresses and HQs at Greater London House, Hampstead Road, London NW1 7FB. Our company number is 3584121 and fakeSite Payments' is 13337408.
            Our UK website www.fakeSite.com offers for sale fakeSite products and certain goods which are indicated on our websites and apps as being sold and shipped directly by fakeSite' brand partners each an “fakeSite Brand Partner”. All products we offer on our website are fakeSite products, unless they are identified as fakeSite Brand Partner products.

            With fakeSite Brand Partners we've linked up with some of our biggest brands so you can now shop extended stock directly from the brand through fakeSite.

            You'll be able to see on the product page if an item is being sold by an fakeSite Brand Partner.

            When you place an order for fakeSite products, your contract is with fakeSite.com Limited.When you order fakeSite Brand Partner products, you enter into a contract to buy their products with the respective fakeSite Brand Partner and a contract with fakeSite Payments to pay for those products in the way described below.

            When you shop with us or access our services, apps and websites our “Websites”, whether you're buying fakeSite products or fakeSite Brand Partner products, these terms apply. They're important for both of us and fakeSite Payments as they set out what each of us expects from each other, and they also give you helpful info. You can also find out more on our Help pages which also form part of these terms. Of course, if you need anything else from us or fakeSite Payments, get in touch with Customer Care– we always love to hear from you!

            We and fakeSite Payments keep these terms and Help pages updated and we and fakeSite Payments amend them every so often, so remember to check back in before you shop, as the latest set will apply.

          </p>
          <h2>About You..</h2>
          <p>

            To shop with us or receive services from fakeSite Payments, you need to:

            be at least 16 years old;
            have a credit or debit card that we and fakeSite Payments accept (see bottom of page for details of current payment providers); and
            be authorised to use that credit or debit card (e.g. it is in your name or you have permission to use it).
            Just FYI, some of the goods sold through our Websites may not be suitable for under 18s.
            You can only place an order for an fakeSite Brand Partner product if you are a consumer. We are unable to sell fakeSite Brand Partner products to businesses (and will therefore also be unable to supply VAT invoices in relation to any fakeSite Brand Partner orders).
          </p>
       
        <h2>Placing order..</h2>
        <p>
          Where you are buying a product directly from us, you will use your card to pay us directly for the product.

          Where you are buying a product from an fakeSite Brand Partner, you will be paying fakeSite Payments to load a credit of an equal amount to an account with fakeSite Payments, and then spending that credit to pay the fakeSite Brand Partner. In order to do this, you need to access fakeSite Payments service by logging in via your fakeSite account in the usual way, selecting the product you wish to buy from the fakeSite Brand Partner, and then pressing the “Place Order” button. By pressing that button, you will be both (1) authorising fakeSite Payments to take a payment from your card to pay fakeSite Payments for a credit to your fakeSite Payments account; and (2) instructing fakeSite Payments that you wish to spend the credit to pay the fakeSite Brand Partner. You can only instruct fakeSite Payments to use credits to pay fakeSite Brand Partners.

          When you place an order, you should receive an acknowledgement e-mail confirming receipt of your order. We or (if you’re buying from an fakeSite Brand Partner) fakeSite Payments then carry out a standard pre-authorisation check to make sure there’s enough money on your card to pay for or towards the order.

          We only accept your order once payment has been approved and we or fakeSite Payments have debited the payment card (and then the contract is made based on these terms).

          You may be able to cancel (not change) your order within a short period of ordering – timings depend on your chosen delivery method and whether you purchased from an fakeSite Brand Partner (and will be set out in the acknowledgement email). You can’t change your order – you’ll need to cancel (and/or return original item(s)), and re-order.

          All orders are subject to availability and confirmation of the order price. Don’t worry, if there’s an issue with an order, we’ll get in touch with you.

          All products remain fakeSite property or the property of the relevant fakeSite Brand Partner until full payment of the purchase price is received by either us or fakeSite Payments, as the case may be.

          Very occasionally, we or fakeSite Payments may need to refuse or cancel an order or close, block or freeze an account (even if we have previously confirmed your order) – e.g. if we notice something unusual on an order or an account or if your order goes against unit limits as detailed on the product display pages of specific products. If your account has been blocked and you think we’ve made a mistake, please get in touch with Customer Care and they’ll be happy to speak to you about it.

          You can end this agreement with fakeSite Payments at any time by ceasing to use the fakeSite Payments service to purchase Brand Partner products, but if you do you won’t be able to pay for fakeSite Brand Partner products. You can’t cancel any payments that you’ve already made through fakeSite Payments.

          Products sold by fakeSite Brand Partner’s are excluded from affiliate cashback reward schemes. You therefore won’t receive cashback on any order made with an fakeSite Brand Partner.
        </p>
        <h2>Delivery</h2>
        <p>
          Before you finalise your order, you’ll be given various delivery options to choose from with estimated delivery time and dates depending on the delivery address.

          Orders are generally shipped to your delivery address from a designated warehouse. If part of your order is shipped from one of the other warehouses in our global network, this part of your order will be delivered by Standard Delivery. You’ll see your estimated delivery date at the checkout.

          You’ll only be charged one delivery fee for all items, even if they’re coming from different warehouses.

          Next Day Delivery and fakeSite Premier may not be available for items sold and shipped directly by fakeSite Brand Partners and you won’t be able to select Click & Collect delivery for your order. However, you won’t be charged for delivery for these items.

          Items that are sold and shipped by fakeSite Brand Partners will be delivered separately and may also arrive on a different day to the rest of your fakeSite items. There are some shipping delivery restrictions for items sold and shipped by fakeSite Brand Partners. You’ll be advised at checkout if we can’t ship an item to your chosen delivery address.

          To see more about how Delivery works with fakeSite Brand Partners, just click here.

          We work our fakeSite socks off to try to meet all delivery times but sometimes there may be delays – e.g. because of postal/carrier delays, logistics or bad weather. We will keep you updated as much as we can and you should be able to track your parcel’s progress.

          Please check out our Delivery and Returns Page for more info. Any problems with your delivery? Please let us know within 30 days of the date which your order should have been delivered and we’ll do our best to help you.


        </p>
        </div>
      </div>
    </div>
  )
}

