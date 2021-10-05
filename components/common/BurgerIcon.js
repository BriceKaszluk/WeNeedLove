import React, { useState } from 'react';
import styles from './styles/BurgerIcon.module.scss';

function BurgerIcon({showNavbar, setShowNavbar}) {

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return(
  <div 
  className={isActive ? `${styles.open} ${styles.nav_icon3}` : `${styles.nav_icon3}`} 
  onClick={() => {
    toggleClass()
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