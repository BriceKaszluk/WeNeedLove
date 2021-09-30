import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Account from '../components/Auth/Account';
import SignUp from '../components/Auth/SignUp';
import { supabase } from '../services/supabaseClient';

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return(
    <MainLayout>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <SignUp /> : <Account key={session.user.id} session={session} />}
      </div>
      <Component {...pageProps} />
    </MainLayout>
  ) 
}

export default MyApp
