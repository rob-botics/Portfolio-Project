/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link";
import "@/app/styles/slt.css";
import { useEffect } from "react";
import { PageWrapper } from "@/app/components/PageWrapper";
import { useCart } from '@/app/slt/components/CartProvider';

export default function Success(){
    const { state } = useCart();
    const { dispatch } = useCart();
    useEffect(() => {
        const email = localStorage.getItem('email');
        async function sendReceipt(){
            const receiptRes = await fetch('../../api/email', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    firstName: '',
                    email: email,
                    success: true,
                    items: state.items
                })
            })

            if(!receiptRes.ok)
                throw new Error('Receipt Failed to Send.');
            else{
                localStorage.removeItem('email')
                state.items.map(item => dispatch({type: 'REMOVE_ITEM', payload: item.id }))
            }
        }
        sendReceipt()
    }, [])
    return(
        <PageWrapper>
            <div style={{alignItems: 'center'}} className="slt-secondary-bg slt-success-container">
                <img src={'../img/success.gif'}/>
                <h1>Your Purchase was successful!!!</h1>
                <div>
                    <Link href='/slt'>Home</Link>
                    <Link href='/slt/menu'>Menu</Link>
                </div>
            </div>
        </PageWrapper>
    )
}