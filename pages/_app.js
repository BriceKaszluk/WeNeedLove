import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null);
  const [redirectTo, setRedirectTo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const notRedirectingUrl = ['/', '/signIn', '/signUp'];
    if(router?.asPath && !notRedirectingUrl.includes(router.asPath) && !session) {
      setRedirectTo(router.asPath);
      router.push('/signIn');
    }
  },[router?.asPath, session])

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(_event === 'SIGNED_IN') {
        router.push(redirectTo || '/');
      }
    })
  }, [redirectTo])

  return(
    <MainLayout session={session}>
      <Component {...pageProps} />
    </MainLayout>
  ) 
}

export default MyApp
