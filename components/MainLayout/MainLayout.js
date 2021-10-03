import React from 'react';
import Footer from './Footer';
import Header from './Header';
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
