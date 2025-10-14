/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import "@/app/styles/slt.css";
import { useCart } from '@/app/slt/components/CartProvider'
import { PageWrapper } from "@/app/components/PageWrapper";
import Link from "next/link";
import { useEffect } from "react";

export default function Success(){
    const { state } = useCart();
    const { dispatch } = useCart();
    useEffect(() => {
        state.items.map(item => dispatch({type: 'REMOVE_ITEM', payload: item.id }))
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