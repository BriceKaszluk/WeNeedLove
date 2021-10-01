import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout({children, session}) {

  return (
    <div>
      <Header session={session} />
        <div>{children}</div>
      <Footer />
    </div>
  )
}
