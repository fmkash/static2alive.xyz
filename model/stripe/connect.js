const stripe = require('stripe')
const stripekey = process.env['secret_key']

const Stripe = stripe(stripekey, {
  apiVersion: '2020-08-27'
})

const createCheckoutSession = async (customerID, price) => {
  const session = await Stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerID,
    line_items: [
      {
        price,
        quantity: 1
      }
    ],
    subscription_data: {
      trial_period_days: "30"
    },

    success_url: `https://static2alive.xyz/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://static2alive.xyz`
  })

  return session
}

const createBillingSession = async (customer) => {
  const session = await Stripe.billingPortal.sessions.create({
    customer,
    return_url: `${wlh}`
  })
  return session
}

const getCustomerByID = async (id) => {
  const customer = await Stripe.customers.retrieve(id)
  return customer
}

const addNewCustomer = async (email) => {
  const customer = await Stripe.customers.create({
    email,
    description: 'New Customer'
  })

  return customer
}

const createWebhook = (rawBody, sig) => {
  const event = Stripe.webhooks.constructEvent(
    rawBody,
    sig,
    "we_1MyS0JCllOEeoE8rgJVRqm8p"
  )
  return event
}

module.exports = {
  getCustomerByID,
  addNewCustomer,
  createCheckoutSession,
  createBillingSession,
  createWebhook
}