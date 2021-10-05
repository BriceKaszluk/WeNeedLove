import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/BurgerIcon.module.scss';

function BurgerIcon({showNavbar, setShowNavbar}) {

  const ref = useRef();

  useEffect(() => {
    const outsideClick = (event) => {
      if(ref && !ref.current.contains(event.target)) {
        setShowNavbar(false);
      }
    }
    document.addEventListener('mouseup', outsideClick)
    return (() => {
      document.removeEventListener('mouseup', outsideClick)
    })
  },[])

  return(
  <div 
  ref={ref}
  className={showNavbar ? `${styles.open} ${styles.nav_icon3}` : `${styles.nav_icon3}`} 
  onClick={() => {
    setShowNavbar(!showNavbar)
  }} 
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  ) 
}

export default BurgerIcon;