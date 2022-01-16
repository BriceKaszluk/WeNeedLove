import React, { useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './styles/MainLayout.module.scss';
import { ToastContainer } from 'react-nextjs-toast';

export default function MainLayout({children, session}) {

  return (
    <div className={styles.wrap}>
      <Header session={session} />
      <ToastContainer align={"right"} position={"bottom"} id="toast-comp-3"/>
      <div>{children}</div>
      <Footer />
    </div>
  )
}
