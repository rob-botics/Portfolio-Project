/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import "@/app/styles/slt.css";
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PageWrapper } from '@/app/components/PageWrapper'
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
    // const [message, setMessage] = useState<string | null>(null)
    // const [isProcessing, setIsProcessing] = useState(false)
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [clientSecret, setClientSecret] = useState<string>('');
    let cartItems: Products[] = [];

    
    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) 
            try {
                const parsed: unknown = JSON.parse(storedCart);

                if (Array.isArray(parsed) && parsed.length > 0) 
                    cartItems = parsed as Products[];
            } catch (e) {console.error('Failed to get cart:', e);}
        
        setCartTotal(parseFloat(cartItems.reduce((sum: number, item: Products) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)))

        // Retrieve clientSecret from sessionStorage
        const secret = sessionStorage.getItem('stripeClientSecret');
        setClientSecret(secret as string);
    }, []);

    // if (!clientSecret)
    //     return <div>Loading payment info...</div>;

    return (
        <PageWrapper>
            <div className="checkout slt-checkout-container slt-secondary-bg">
                <div className="checkout-cart">
                    <p>Display Cart</p>
                </div>
                <div className="payment">
                    <Elements options={{clientSecret}} stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
            </div>
        </PageWrapper>
    );
}

function CheckoutForm(){
    const stripe = useStripe()
    const elements = useElements()

    return <PaymentElement/>
}