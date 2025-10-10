'use client'

import "@/app/styles/slt.css";
import { PageWrapper } from '@/app/components/PageWrapper'

type Products = {
    id: string;
    price: string;
    desc: string;
    img: string;
    quantity: number
}
const CheckoutForm = () =>{
    const storedCart = sessionStorage.getItem('cart');
    let cartItems: Products[] = [];

    if (storedCart) {
        try {
            const parsed: unknown = JSON.parse(storedCart);

            if (Array.isArray(parsed) && parsed.length > 0) 
                cartItems = parsed as Products[];
        } catch (e) {console.error('Failed to get cart:', e);}
    }
    const cartTotal: number = parseFloat(cartItems.reduce((sum: number, item: Products) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2))
       
    return(
        <PageWrapper>
            <div className="slt-checkout-container slt-secondary-bg">
                <h1 style={{color: '#000'}}>Checkout {cartTotal}</h1>
            </div>
        </PageWrapper>
    )
} 
export default CheckoutForm