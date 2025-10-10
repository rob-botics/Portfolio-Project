import Stripe from 'stripe'
import "@/app/styles/slt.css";
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
    try{
        const { items } = await req.json()
        
        if (!items || !Array.isArray(items)) 
            return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
        
        const amount = parseFloat(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // convert to cents
            currency: 'USD',
            metadata: {cart: JSON.stringify(items),},
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret,});

    } catch (error) {
        console.error('Stripe API error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}