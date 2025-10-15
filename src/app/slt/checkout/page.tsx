/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import "@/app/styles/slt.css";
import React, { useEffect, useState } from 'react'
import { Appearance, loadStripe } from '@stripe/stripe-js'
import { PageWrapper } from '@/app/components/PageWrapper'
import { useCart } from '@/app/slt/components/CartProvider'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Elements, LinkAuthenticationElement } from '@stripe/react-stripe-js'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
type Products = {
    id: string;
    price: string;
    desc: string;
    img: string;
    quantity: number
}

export default function Checkout() {
    const { state } = useCart();
    const { dispatch } = useCart();
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [clientSecret, setClientSecret] = useState<string>('');

    async function handleGetSecretClient(): Promise<string | undefined> {
        if (state.items.length > 0) 
            try {
                const res = await fetch('/api/store-cart', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ items: state.items }),
                }) 
                const result = await res.json()                  
                if (!result.clientSecret) 
                    throw new Error('Failed to store cart data.')
                return result.clientSecret as string
            } catch (err) {console.error('Checkout failed:', err)}
        return undefined
    }
    useEffect(() => {
        async function fetchClientSecret() {
            const clientSecret = await handleGetSecretClient();
            if (clientSecret) 
                setClientSecret(clientSecret);
        }
        fetchClientSecret()
    }, []);

    useEffect(() => {
        setCartTotal(parseFloat(state.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)))
    },[state.items])


     const handleAddItem = (products: Products[], productName: string) => {
        console.log("Object: ",products)
        const product = products.find(product => product.id === productName) as Products
        console.log('Prod: ', product)
        dispatch({ type: 'ADD_ITEM', payload: product });
    }
    const handleSubtractItem = (products: Products[], productName: string) => {
        const product = products.find(product => product.id === productName) as Products

        if(product.quantity > 1)
            dispatch({ type: 'SUBTRACT_ITEM', payload: product });
        else
            dispatch({ type: 'REMOVE_ITEM', payload: product.id });
    }

    const appearance: Appearance = {
        theme: 'stripe', // or 'flat', 'night', or 'none'
        variables: {
            borderRadius: '4px',
            colorText: 'black',
            colorPrimary: '#e75480ec',
            colorBackground: 'whitesmoke',
            fontFamily: "'M PLUS Rounded 1c', arial",
        },
        rules: {
            '.Label': {
                color: 'whitesmoke',
                paddingTop: '10px'
            }
        }
    };
    return (
        <PageWrapper>
            <div className="checkout slt-checkout-container slt-secondary-bg">
                <h1>Checkout</h1>
                <div className="checkout-cart">
                    <div>
                        {state.items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-info">
                                <img src={item.img} alt={item.id} width={50} />
                                <p>{item.id}</p>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className='subtotal'>
                                <div className='plus-minus'>
                                    <FontAwesomeIcon onClick={() => handleSubtractItem(state.items, item.id)} icon={"fa-solid fa-minus" as IconProp} />
                                    <FontAwesomeIcon onClick={() => handleAddItem(state.items, item.id)} icon={"fa-solid fa-plus" as IconProp} />
                                </div>
                                <p>Subtotal: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                            </div>
                            <hr/>
                        </div>
                        ))}
                        <div className="cart-total">
                            Total: ${state.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
                        </div>
                    </div>
                </div>
                {!clientSecret ? <FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" />
                : <div className="payment">
                    <Elements options={{clientSecret, appearance}} stripe={stripePromise}>
                        <CheckoutForm cartTotal={cartTotal}/>
                    </Elements>
                </div>}
            </div>
        </PageWrapper>
    );
}
type Total = {
    cartTotal: number
}

function CheckoutForm({cartTotal}: Total){
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    function handlePayment(){
        if (stripe == null || elements == null || email == null) return

        setIsProcessing(true)

        stripe.confirmPayment({elements, confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}?email=${encodeURIComponent(email)}`
        }}).then(({error}) => {
            if(error.type === 'card_error' || error.type === 'validation_error')
                setErrorMessage(error.message)
            else
                setErrorMessage('An unknown error occurred.')
        }).finally(() => setIsProcessing(false))
    }

    return (
        <>  
            {errorMessage && <p>{errorMessage}</p>}
            <PaymentElement/>
            <LinkAuthenticationElement onChange={e => setEmail(e.value.email)}/>
            <button onClick={() => handlePayment()} disabled={stripe == null || elements == null || isProcessing}>
                {isProcessing ? 'Purchasing...': `Purchase $${cartTotal}`}
            </button>
        </>
    )
}