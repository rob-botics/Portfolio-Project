/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import LoadingScreen from '@/app/components/LoadingScreen'
import { useCart } from '@/app/slt/components/CartProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { POST } from '@/app/api/email/route';
library.add(fas, far, fab)

type Products = {
    id: string;
    price: string;
    desc: string;
    img: string;
    quantity: number
}
type Mobile = {
    mobile : boolean
    closeSidebar: () => void;
}
const Nav = ({mobile, closeSidebar}: Mobile) => {
    const router = useRouter()
    const { state } = useCart();
    const pathname = usePathname()

    const { dispatch } = useCart();
    const [isCart, setIsCart] = useState(false)
    const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

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
    const handleMobile = () => {
        if(mobile === true)
            if (mobile) closeSidebar();
    }
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(state.items))
    }, [state.items])
    
   async function handleCheckout() {
        if(!pathname.includes('checkout'))
            if (cartCount !== 0) 
                try {
                const res = await fetch('/api/store-cart', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ items: state.items }),
                })

                const result = await res.json()                  
                if (!result.clientSecret) 
                    throw new Error('Failed to store cart data.')
                
                sessionStorage.setItem('stripeClientSecret', result.clientSecret);
                router.push('/slt/checkout')
                } catch (err) {console.error('Checkout failed:', err)}
    }

    if (!isClient) return <LoadingScreen loaded={isClient}/>
    return(
        <>            
            <div className="wave-top">
                <svg className='wave' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
                <nav>
                    <div>
                        <Link onClick={() => handleMobile()} href='/slt' className='nav-link'><span><FontAwesomeIcon icon={"fa-regular fa-house" as IconProp} size='xl'/> Home</span></Link>
                        <Link onClick={() => handleMobile()} href='/slt/menu' className='nav-link'><span><FontAwesomeIcon icon={"fa-solid fa-cake-candles" as IconProp} size='xl'/> Menu</span></Link>
                        <Link onClick={() => handleMobile()} href='/slt/contact' className='nav-link'><span><FontAwesomeIcon icon={"fa-regular fa-user" as IconProp} size='xl'/>Contact</span></Link>
                    </div>
                    <div>
                       <div className='cart-container'>
                            <span className='cart' onClick={() => setIsCart(prev => !prev)}><FontAwesomeIcon icon={"fa-solid fa-cart-shopping" as IconProp} size='xl'/></span>
                            <span className='cart-quantity' onClick={() => setIsCart(prev => !prev)}>{cartCount}</span>
                           
                       </div>
                        <div className={`cart-component ${isCart === true ? 'cart-show' : 'cart-hide'}`}>
                            <ul className="cart-list">
                                {state.items.length === 0 ? <p>Your cart is empty.</p>
                                :state.items.map((item, index) => (
                                    <li key={index} className="cart-item">
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
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-total">
                                Total: ${state.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
                                <button onClick={() => handleCheckout()}>Checkout</button>
                            </div>
                        </div>
                       <span><Link href='/slt/login'>Login</Link></span>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default Nav