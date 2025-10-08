/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import "@/app/styles/slt.css";
import { PageWrapper } from "@/app/components/PageWrapper"
import { useEffect, useRef, useState } from "react";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [loginBTN, setLoginBTN] = useState('Login')
    const loginEmailRef = useRef<HTMLInputElement>(null)
    const loginPswdRef = useRef<HTMLInputElement>(null)

    function handleSubmit(){
        const email = loginEmailRef.current?.value
        const pswd = loginPswdRef.current?.value
        console.log('test', email, pswd)
    }
    useEffect(() => {
        if(isLogin === false){
            setLoginBTN('Sign Up')
            loginEmailRef.current && (loginEmailRef.current.value = '');
            loginPswdRef.current && (loginPswdRef.current.value = '')
        }
        else
            setLoginBTN('Login')
    }, [isLogin])
    return(
        <PageWrapper>
            <div className="slt-contact-container slt-secondary-bg">
                <div className="login">
                    <div className="login-btns">
                        <button className={ `${isLogin ? "active" : ''}`} onClick={() => setIsLogin(true)}>Login</button>
                        <button className={ `${!isLogin ? "active" : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
                    </div>
                    <div className="form-container">
                        <form style={{ margin: `47.5px 0` }} className={ `${isLogin ? "active" : ''}`}>
                            <label htmlFor="loginEmail">Email</label>
                            <input ref={loginEmailRef} type="text" id="loginEmail" placeholder="Email"/>
                            <label htmlFor="loginPswd">Password</label>
                            <input ref={loginPswdRef} type="password" id="loginPswd" placeholder="Password"/>
                        </form>
                        <form className={ `${!isLogin ? "active" : ''}`}>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" placeholder="First Name"/>
                            <label htmlFor="lname">Last Name</label>
                            <input type="password" id="lname" placeholder="Last Name"/>
                            <label htmlFor="suEmail">Email</label>
                            <input type="password" id="suEmail" placeholder="Last Name"/>
                            <label htmlFor="phoneNo">Phone Number</label>
                            <input type="password" id="phoneNo" placeholder="Last Name"/>
                            <label htmlFor="suPswd">Password</label>
                            <input type="password" id="suPswd" placeholder="Last Name"/>
                            <label htmlFor="confirm pswd">Confirm Password</label>
                            <input type="password" id="confirm pswd" placeholder="Last Name"/>
                        </form>
                    </div>
                    <button onClick={() => handleSubmit()} type="submit">{loginBTN}</button>
                </div>
            </div>
        </PageWrapper>
    )
}
export default Login