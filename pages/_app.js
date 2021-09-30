import React, { useState, useEffect, useCallback } from 'react';
import '../styles/globals.css';
import MainLayout from '../components/MainLayout/MainLayout';
import { supabase } from '../services/supabaseClient';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const [session, setSession] = useState(null)
  const router = useRouter();

  useEffect(() => {
    function setSessionAndRedirect(session) {
      setSession(session)
      if(!session) {
        router.push('/signIn');
      }
    }
    setSessionAndRedirect(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionAndRedirect(session)
      if(_event === 'SIGNED_IN') {
        router.push('/');
      }
    })
  }, [])

  return(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  ) 
}

export default MyApp
