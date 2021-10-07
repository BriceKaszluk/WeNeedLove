import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null);
  const [appStarted, setAppStarted] = useState(true);

  const notRedirectingUrl = ['/', '/signIn', '/signUp'];
  const router = useRouter();

  useEffect(() => {
    if(router?.asPath && !notRedirectingUrl.includes(router.asPath) && !session && !appStarted) {
      router.push('/signIn');
    }
  },[router?.asPath, session, appStarted])

  useEffect(() => {
    setSession(supabase.auth.session())
    setAppStarted(false);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(_event === 'SIGNED_IN') {
        router.push('/piggy-bank' || '/');
      }
    })
  }, [])

  return(
    <MainLayout session={session}>
      {
        (router?.asPath && !notRedirectingUrl.includes(router.asPath) && !session) ? 'loading' : <Component {...pageProps} />
      }
    </MainLayout>
  ) 
}

export default MyApp
