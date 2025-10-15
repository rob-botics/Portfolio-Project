import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import WelcomeEmail from '@/emails/welcome'
import SuccessEmail from '@/emails/completeOrder'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request){
    const {firstName, email, success, items} = await request.json();
    if(success === true)
        await resend.emails.send({
            from: 'noreply@mail.robertamorrison.com',
            to: email,
            subject: 'Sweet Little Things Receipt',
            react: SuccessEmail(items),
        })
    else
        await resend.emails.send({
            from: 'noreply@mail.robertamorrison.com',
            to: email,
            subject: 'Sweet Little Things Newsletter',
            react: WelcomeEmail({firstName, email}),
        })
    return NextResponse.json({status: 'OK'})
}

