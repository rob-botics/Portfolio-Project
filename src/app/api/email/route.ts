import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import WelcomeEmail from '@/emails/welcome'
import { ok } from 'assert';
import { render } from '@react-email/render';
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request){
    const {firstName, email} = await request.json();
    
    await resend.emails.send({
        from: 'noreply@mail.robertamorrison.com',
        to: email,
        subject: 'Sweet Little Things Newsletter',
        react: WelcomeEmail({firstName, email}),
    })
    return NextResponse.json({status: 'OK'})
}

