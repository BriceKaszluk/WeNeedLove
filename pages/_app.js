import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";
import Script from 'next/script';
import { analytics } from '../services/firebaseClient';

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null);
  const [appStarted, setAppStarted] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    analytics()
  },[])

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
      {/* <!-- Google Tag Manager --> */}
      <Script 
      id="google_tag_manager"
      dangerouslySetInnerHTML={{
    __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5T4KV72');`}} />

    {
      (router?.asPath && !notRedirectingUrl.includes(router.asPath) && !session) ? 'loading' :  
      <MainLayout 
        session={session}
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5T4KV72"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <Component {...pageProps} session={session} />
      </MainLayout>
    }
    </>
  ) 
}

export default MyApp
