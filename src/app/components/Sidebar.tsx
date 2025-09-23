
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState} from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)

type Theme = 'forest' | 'royal' | 'garden';
type SidebarProps = {
  theme: Theme;
  themeChanger: (theme: Theme) => void;
  toggle: () => void;
};

export default function Sidebar ({ themeChanger, theme, toggle }: SidebarProps){
    const pathname = usePathname();
    const [isActive, setIsActive] = useState('')
    const [sidebarCompress, setSidebarCompress] = useState(false)
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);
    const handleThemeChange = (selectedTheme: Theme) => themeChanger(selectedTheme)

    useEffect(() => {
        setTimeout(() => {
        setIsActive(pathname)
        }, 425) // delay in ms
    }, [pathname])
    useEffect(() => {
        setMounted(true);
        const mediaQuery = window.matchMedia('(max-width: 670px)');
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleArrowClick = () => {
        setSidebarCompress(prev => !prev)
        const body: HTMLElement = document.body

        body.classList.toggle('body-compress')
    }
    return(
        <>
        <aside className={`sidebar ${sidebarCompress ? 'sidebar-animation' : ''}`}>
           {mounted && !isMobile && <FontAwesomeIcon icon={"fa-regular fa-circle-right" as IconProp} className={`arrow ${sidebarCompress ? "arrow-animation" : ""}`} onClick={() => handleArrowClick()}/> }
           {mounted && isMobile && <FontAwesomeIcon icon={"fa-solid fa-square-xmark" as IconProp} onClick={() => toggle()} className='x-sb'  size="2xl"/>}
           <ul className="sb-list">
                <li><Link className={isActive === "/" ? "active-link" : ""} href='/'><FontAwesomeIcon icon={"fa-solid fa-house" as IconProp} /><span className={`nav-text ${sidebarCompress ? "hide" : ""}`}>&nbsp; Home</span></Link></li>
                <li><Link className={isActive === "/about" ? "active-link" : ""} href='/about'><FontAwesomeIcon icon={"fa-solid fa-circle-user" as IconProp} /><span className={`nav-text ${sidebarCompress ? "hide" : ""}`}>&nbsp; About</span></Link></li>
                <li><Link className={isActive === "/projects" ? "active-link" : ""} href='/projects'><FontAwesomeIcon icon={"fa-solid fa-cubes" as IconProp} /><span className={`nav-text ${sidebarCompress ? "hide" : ""}`}>&nbsp; Projects</span></Link></li>
                <li className={`theme-changer`}>
                    <FontAwesomeIcon icon={"fa-solid fa-palette" as IconProp} /><span className={`nav-text ${sidebarCompress ? "hide" : ""}`}>&nbsp; Themes</span>
                    <div>
                        <select className="select" value={theme}  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleThemeChange(event.target.value as Theme)}>
                            <option className="forest-option" value='forest'>Forest</option>
                            <option className="royal-option" value='royal'>Royal</option>
                            <option className="garden-option" value='garden'>Garden</option>
                        </select>
                    </div>
                </li>
           </ul>
        </aside>
        </>
    )
}