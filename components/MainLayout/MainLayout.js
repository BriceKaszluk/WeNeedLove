import React, { useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({children, session}) {

  return (
    <div className={styles.wrap}>
      <Header session={session} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
