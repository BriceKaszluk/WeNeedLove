import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";
import Script from 'next/script';
import { analytics } from '../services/firebaseClient';

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [notRedirectingUrl, setNotRedirectingUrl] = useState(['/', '/signIn', '/signUp', '/reset-password', '/update-password']);

  useEffect(() => {
    analytics()
  },[])

  const router = useRouter();

  useEffect(() => {
    if(userLoaded && router?.pathname) {
      if(session) {
        supabase.auth.onAuthStateChange((_event) => {
          if(_event === 'SIGNED_OUT') {
            router.push('/');
          }
        })
      } else if(!notRedirectingUrl.includes(router.pathname) && !session) {
        sessionStorage.setItem('redirectUrl', router.pathname);
        router.push('/signIn');
      }
    }
  },[router?.pathname, userLoaded, router, notRedirectingUrl])

  useEffect(() => {
    setSession(supabase.auth.session())
    setUserLoaded(true);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
        if(_event === 'SIGNED_IN' && router.pathname !== '/update-password') {
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
      (router?.pathname && !notRedirectingUrl.includes(router.pathname) && !session) ? 'loading' :  
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
