import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout({children}) {

  return (
    <div>
      <Header />
        <div>{children}</div>
      <Footer />
    </div>
  )
}
