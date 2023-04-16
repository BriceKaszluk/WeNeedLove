import React, { useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './styles/MainLayout.module.scss';
import CookieBanner from '../common/CookieBanner';

export default function MainLayout({children, session}) {

  return (
    <div className={styles.wrap}>
      <Header session={session} />
      <CookieBanner />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
