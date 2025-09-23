import React from "react";
import Link from "next/link";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)

const Sidebar = () => {
    return(
        <>
        <footer>
             <div className="footer-section"><h3>Links:</h3>
                    <div className="footer-content">
                        <Link href="/"><span>Home</span></Link>
                        <Link href="/about"><span>About</span></Link>
                        <Link href="/projects"><span>Projects</span></Link>
                    </div>
                </div>
                <div className="footer-section"><h3>Social:</h3>
                    <div className="footer-content socials">
                       <Link href='https://www.linkedin.com/in/robert-a-morrison'><span><FontAwesomeIcon icon={"fa-brands fa-square-linkedin" as IconProp} size="2xl" /></span></Link>
                       <Link href='https://github.com/rob-botics/'><span><FontAwesomeIcon icon={"fa-brands fa-github" as IconProp} size="2xl"/></span></Link>
                    </div>
                </div>
                <div className="footer-section"><h3>Contact:</h3>
                    <div className="footer-content">
                        <Link href='tel:1234567890'><span><FontAwesomeIcon icon={"fa-solid fa-phone-volume" as IconProp} />&nbsp; (123) 456-7890</span></Link> 
                        <Link href='mailto:r.morrison2219@gmail.com'><span><FontAwesomeIcon icon={"fa-solid fa-envelope" as IconProp} />&nbsp; r.morrison2219@gmail.com</span></Link>
                    </div>
                </div>        
        </footer>
        </>
    )
}
export default Sidebar