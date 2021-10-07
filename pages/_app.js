import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null);
  const [appStarted, setAppStarted] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const notRedirectingUrl = ['/', '/signIn', '/signUp'];
  const router = useRouter();

  useEffect(() => {
    if(userLoaded && router?.asPath) {
      if(!notRedirectingUrl.includes(router.asPath) && !session && !appStarted) {
        router.push('/signIn');
      }
      setAppStarted(true);
    }
  },[router?.asPath, session, appStarted, userLoaded])

  useEffect(() => {
    setSession(supabase.auth.session())
    setUserLoaded(true);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(_event === 'SIGNED_IN') {
        router.push('/piggy-bank' || '/');
      }
      if(_event === 'SIGNED_OUT') {
        router.push('/');
      }
    })
  }, [])

  return(
    <>
    {
      (router?.asPath && !notRedirectingUrl.includes(router.asPath) && !session) ? 'loading' :  
      <MainLayout 
        session={session}
      >
        <Component {...pageProps} />
      </MainLayout>
    }
    </>
  ) 
}

export default MyApp
