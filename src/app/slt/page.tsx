/* eslint-disable @next/next/no-img-element */
//npm instal react-email @react-email/button @react-email/html
'use client'
import "@/app/styles/slt.css";
import Link from 'next/link'
import { useRef, useState } from 'react'
import Slider from '../components/Slider'
import { PageWrapper } from '../components/PageWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const Home = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState(false)
    const [subcribe, setSubscribe] = useState(false)
    function checkEmail(email:string){
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
            setError(true)
        else
            setError(false)
    }
    async function handleSubscribe(firstName: string, email: string | undefined){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(emailRegex.test(email as string)){
            setSubscribe(true)
            setError(false)
            const welcomeRes = await fetch('api/email', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: firstName,
                    email: email    
                })
            })
            if(!welcomeRes.ok) 
                throw new Error('Subscription Failed. Try again!');
            else {
                email = ''
                alert('You Have Successfully Subscribed')
                setSubscribe(false)
            }
            const welcomeData = await welcomeRes.json();
            console.log('Welcome: ',welcomeData, emailRef.current?.value)
        }
        else {
            setError(true)
        }
    }
    
    return(
        <PageWrapper>
            <main>
                <header>
                    <Slider page={'slt'}></Slider>
                </header>
                <section className='slt-section slt-secondary-bg'>
                    <h2 className='slt-section-title-home'>Sweet Little Things Menu</h2>
                    <div className='home-menu'>
                        <div>
                            <Link href="/slt/menu#cheesecakes"><img src={'/img/slt/home/home-cheesecake.jpg'} alt='home cake'/></Link>
                            <p>Cheesecakes</p>
                        </div>
                        <div>
                            <Link href='/slt/menu#cakes'><img src={'/img/slt/home/home-cake.jpg'} alt='home cake'/></Link>
                            <p>Cakes</p>
                        </div>
                        <div>
                            <Link href="/slt/menu#cupcakes"><img src={'/img/slt/home/home-cupcake.jpg'} alt='home cake'/></Link>
                            <p>Cupcakes</p>
                        </div>
                        <div>
                            <Link href="/slt/menu#jellos"><img src={'/img/slt/home/home-jello.jpg'} alt='home cake'/></Link>
                            <p>Jellos</p>
                        </div>                    
                    </div>
                </section>
                <section className='slt-section'>
                    <div className='instagram-grid'>
                        <span>FOLLOW US<br/>ON INSTAGRAM</span>
                        <span>
                            <a href="https://www.instagram.com/p/CBmCSkggoC-/?utm_source=ig_web_copy_link">
                                <img className='social-img' src={'/img/slt/social/heart.jpeg'} alt=''/>
                            </a>
                        </span>
                        <span>
                            <a href="https://www.instagram.com/p/CBovpb_ho4Y/?utm_source=ig_web_copy_link">
                                <img className='social-img' src={'/img/slt/social/cup_mm.jpg'} alt=''/>
                            </a>
                        </span>
                        <span>
                            <a href="https://www.instagram.com/p/CNOUQV2BDoA/?utm_source=ig_web_copy_link">
                                <img className='social-img' src={'/img/slt/social/bf_cake.jpeg'} alt=''/>
                            </a>
                        </span>
                        <span>
                            <a href="https://www.instagram.com/p/CLPNJzDhZTE/?utm_source=ig_web_copy_link">
                                <img className='social-img' src={'/img/slt/social/wc_heart.jpeg'} alt=''/>
                            </a>
                        </span>
                        <span>Go To &nbsp; <a href='https://www.instagram.com/sweetlittlem_'>@sweetlittlem_</a> </span>
                    </div>
                </section>
                <section className='slt-section slt-secondary-bg'>
                    <h2 className='slt-section-title-home' style={{marginTop: '150px'}}>JOIN OUR EMAIL CLUB FOR:<br/><small>COUPONS, DISCOUNT CODES, & MORE</small></h2>
                    <div className='subscribe-container'>
                         {error && <p className="error">please enter a valid email address</p>}
                        <div className='subscribe'>
                            <input ref={ emailRef } onBlur={() => {checkEmail(emailRef.current?.value as string)}} type='text' placeholder='Email'></input>
                            <button onClick={() => handleSubscribe('New Customer', emailRef.current?.value)}>Subcribe</button>
                        </div>
                    </div>
                </section>
                { subcribe &&
                    <div className='loading'><FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" /></div>
                }
            </main>
        </PageWrapper>
    )
}
export default Home