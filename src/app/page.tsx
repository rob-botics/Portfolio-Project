/* eslint-disable @next/next/no-img-element */

'use client'
import Link from "next/link";
import Slider from "./components/Slider";
import { PageWrapper } from './components/PageWrapper';
import { useInView } from "react-intersection-observer";
import React, { useEffect,useRef,useState } from "react";

type HomeProps = {theme: string}

export default function Home ({theme}: HomeProps) {
    type Skill = {
      name: string
      src: string
      exp: number
    }
    const introRef = useRef<HTMLElement | null>(null)
    const skillsRef = useRef<HTMLElement | null>(null)
    const projectsRef = useRef<HTMLElement | null>(null)

    const { ref: introInViewRef, inView: introInView } = useInView({ threshold: 0.1 });
    const { ref: skillsInViewRef, inView: skillsInView } = useInView({ threshold: 0.1 });
    const { ref: projectsInViewRef, inView: projectsInView } = useInView({ threshold: 0.1 });
    
    const [headshotFade, setHeadshotFade] = useState(false);
    const skillImages: Skill[] = [
      {name: 'html', src: '/img/skills/html.png', exp: 0}, 
      {name: 'css', src: '/img/skills/css.png', exp: 0}, 
      {name: 'js', src: '/img/skills/js.png', exp: 0}, 
      {name: 'java', src: '/img/skills/java.png', exp: 0}, 
      {name: 'sql', src: '/img/skills/sql.png', exp: 0},
      {name: 'react', src: '/img/skills/react.png', exp: 0}, 
      {name: 'agile', src: '/img/skills/agile.png', exp: 0}, 
      {name: 'bootstrap', src: '/img/skills/bootstrap2.png', exp: 0}, 
      {name: 'git', src: '/img/skills/git.png', exp: 0}
    ]
    const priority = ['html', 'css', 'js', 'java', 'sql', 'react', 'agile', 'bootstrap', 'git'];
    skillImages.sort((a: Skill, b: Skill) => priority.indexOf(a.name) - priority.indexOf(b.name));

    useEffect(() => {
    setHeadshotFade(true); // fade out

    const timeout = setTimeout(() => {setHeadshotFade(false); }, 500);
    return () => clearTimeout(timeout);
    }, [theme]);

    return(
        <PageWrapper>
            <section className={`${introInView ? "fade-in" : "hidden"}`} ref={(element) => { introRef.current = element; introInViewRef(element); }}>
                {introInView && <>
                    <div className={`headshot ${headshotFade ? 'fade' : ''}`}><Slider page={'home'}/></div>
                    <div className="landing-title"><h1>Welcome To A Robert Morrison Web Production</h1></div> 
                </>}
            </section>
            <section  className={`${skillsInView ? "fade-in" : "hidden"}`} ref={(element) => { skillsRef.current = element; skillsInViewRef(element); }}>
                {skillsInView && <>
                    <div className="section-title "><h2 >Skills</h2></div>
                    <div className="skill-container">
                        {skillImages.map((img, index:number) => (
                            img.name.includes('java') ? 
                            <div className="skills flip-card" key={index}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={img.src} alt={`${img.name}`} className='java'/>
                                    </div>
                                    <div className="flip-card-back">
                                        <p className="skills-name">
                                            {img.name.replace(/\..*$/, '')}<br/> 
                                            {`(${img.exp})`}
                                        </p> 
                                    </div>
                                </div>
                            </div>
                            : <div className="skills flip-card" key={index}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={img.src} alt={`${img.name}`} className='skills-img'/>
                                    </div>
                                    <div className="flip-card-back">
                                        <p className="skills-name">
                                            {img.name.replace(/\..*$/, '')} <br/>
                                            {`(${img.exp})`}
                                        </p> 
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}
            </section>
            <div style={{position: 'relative'}}>
                <svg className="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path  d="M0,256L60,224C120,192,240,128,360,101.3C480,75,600,85,720,117.3C840,149,960,203,1080,224C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className={`secondary-bg`}>
                <div className={`${projectsInView ? "fade-in" : "hidden"}`} ref={(element) => { projectsRef.current = element; projectsInViewRef(element); }}>
                    {projectsInView && <>
                    <div className="section-title "><h2 >Projects</h2></div>
                    <div className="home-projects-container">
                        <div className="home-projects"><h3>Coming Soon!</h3></div>
                        <div className="home-projects">
                            <h3>Sweet Little Things</h3>
                            <Link href='/slt'><img src={"/img/slt.png"} alt="Sweet Little Things"/></Link>
                        </div>
                        <div className="home-projects"><h3>Coming Soon!</h3></div>
                    </div>
                </>}
                </div>
            </section>
        </PageWrapper>
    )
}