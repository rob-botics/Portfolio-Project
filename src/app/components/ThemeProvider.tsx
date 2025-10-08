/* eslint-disable @next/next/no-img-element */
'use client';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Nav from '../slt/components/Nav';
import LoadingScreen from './LoadingScreen';
import { usePathname } from 'next/navigation';
import SLTFooter from '../slt/components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { CartProvider } from '../slt/components/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { createContext, useEffect, useState, ReactNode } from 'react';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link';
library.add(fas, far, fab)


type Theme = 'forest' | 'royal' | 'garden';

export const ThemeContext = createContext<Theme>('forest');

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebar, setSidebar] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<Theme>('forest');
  const themeChanger = (theme: Theme) => {setTheme(theme)}
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebar(prev => !prev);
  };

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) 
      setTheme(savedTheme);

    const mediaQuery = window.matchMedia('(max-width: 670px)');
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches); // Initial mobile state
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  useEffect(() => {
    if(pathname.includes('/slt'))
      document.body.className = 'slt-body'
    else{
      document.body.className = document.body.className.includes('body-compress') ? 'body-compress' : ''
      document.body.classList.add(`${theme}-theme-colors`);
      localStorage.setItem('theme', theme);
    }
  }, [theme, pathname]);
  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') 
      setTimeout(() => handleLoad(), 1000)
    else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      <LoadingScreen loaded={!isLoaded}/>
      <ThemeContext.Provider value={theme}>
      {pathname.includes('slt') ? <>
          <CartProvider>
            {mounted && isMobile && <input type='checkbox' checked={sidebar} onChange={toggleSidebar} id='bars'/>}
            {mounted && isMobile && <label htmlFor="bars"><FontAwesomeIcon icon={"fa-solid fa-bars-staggered" as IconProp} className='bars' size='xl'/></label>}
            {mounted && isMobile && <label htmlFor="bars"><FontAwesomeIcon icon={"fa-solid fa-xmark" as IconProp} className='xmark' size='xl'/></label>}
            <Nav/>
            <Link href='/slt'><img className='logo' src={'/img/slt/logo.jpg'} alt='slt logo'/></Link>
            {children}
            <SLTFooter/>
          </CartProvider>
        </>
        : <>
          {mounted && isMobile && <input type='checkbox' checked={sidebar} onChange={toggleSidebar} id='bars'/>}
          <Sidebar themeChanger={themeChanger} toggle={toggleSidebar} theme={theme}/>
          {mounted && isMobile && <label htmlFor="bars"><FontAwesomeIcon icon={"fa-solid fa-bars-staggered" as IconProp} className='bars' size='lg'/></label>}
          <main className='content-wrapper'>
            {children}            
            <Footer/>
          </main> 
        </>
      }
      </ThemeContext.Provider>
    </>
  );
}
