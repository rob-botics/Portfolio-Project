/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import "@/app/styles/slt.css";
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PageWrapper } from '@/app/components/PageWrapper'
import { useCart } from '@/app/slt/components/CartProvider'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    const { state } = useCart();
    
    const { dispatch } = useCart();
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [clientSecret, setClientSecret] = useState<string>('');
    const [cartItems, setCartItems] = useState<Products[]>([]);

    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) 
            try {
                const parsed: unknown = JSON.parse(storedCart);

                if (Array.isArray(parsed) && parsed.length > 0) 
                    setCartItems(parsed as Products[])
            } catch (e) {console.error('Failed to get cart:', e);}
        
        // Retrieve clientSecret from sessionStorage
        const secret = sessionStorage.getItem('stripeClientSecret');
        setClientSecret(secret as string);
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
    // if (!clientSecret)
    //     return <div>Loading payment info...</div>;

    return (
        <PageWrapper>
            <div className="checkout slt-checkout-container slt-secondary-bg">
                <div className="checkout-cart">
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
                </div>
                <div className="payment">
                    <Elements options={{clientSecret}} stripe={stripePromise}>
                        <CheckoutForm/>
                        {cartTotal}
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