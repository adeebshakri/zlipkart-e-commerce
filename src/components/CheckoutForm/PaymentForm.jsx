import { Button, Divider, Typography } from '@material-ui/core'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { get } from 'lodash'
import React from 'react'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ nextStep, backStep, shippingData, checkoutToken, onCaptureCheckout }) => {
  const formatted_with_symbol = get(checkoutToken, 'subtotal.formatted_with_symbol');
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
    } else {
      const orderData = {
        line_items: get(checkoutToken, 'line_items'),
        customer: { firstname: get(shippingData, 'firstname'), lastname: get(shippingData, 'lastname'), email: get(shippingData, 'email') },
        shipping: {
          name: 'Primary',
          street: get(shippingData, 'address1'),
          town_city: get(shippingData, 'city'),
          coountry_state: get(shippingData, 'shippingSubdivision'),
          postal_zip_code: get(shippingData, 'zip'),
          country: get(shippingData, 'shippingCountry'),
        },
        fulfillment: { shipping_method: get(shippingData, 'shippingOption') },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: get(paymentMethod, 'id'),
          }
        }
      }

      onCaptureCheckout(get(checkoutToken, 'id'), orderData);
      nextStep();
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm