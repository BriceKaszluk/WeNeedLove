import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import MainLayout from "../components/MainLayout/MainLayout";
import { supabase } from "../services/supabaseClient";
import { useRouter } from "next/router";
import { ToastProvider } from "../contexts/ToasterContext";
import { ToastContainer } from "../components/common/ToastContainer";
import { Analytics } from '@vercel/analytics/react';
import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [notRedirectingUrl, setNotRedirectingUrl] = useState([
    "/",
    "/?auth=signin",
    "/?auth=signup",
    "/?auth=resetPassword",
    "/update-password",
  ]);

  const router = useRouter();

  useEffect(() => {
    if (userLoaded && router?.pathname) {
      if (session) {
        supabase.auth.onAuthStateChange((_event) => {
          if (_event === "SIGNED_OUT") {
            router.push("/");
          }
        });
      } else if (!notRedirectingUrl.includes(router.pathname) && !session) {
        sessionStorage.setItem("redirectUrl", router.pathname);
        router.push("/signIn");
      }
    }
  }, [router?.pathname, userLoaded, router, notRedirectingUrl]);

  useEffect(() => {
    setSession(supabase.auth.session());
    setUserLoaded(true);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_IN" && router.pathname !== "/update-password") {
        router.push("/piggy-bank" || "/");
      }
      if (_event === "SIGNED_OUT") {
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      {/* <!-- Google Tag Manager --> */}
      {router?.pathname &&
      !notRedirectingUrl.includes(router.pathname) &&
      !session ? (
        "loading"
      ) : (
        <ToastProvider>
          {router.pathname === "/" ? null : <Header session={session} />}
          <MainLayout session={session}>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5T4KV72"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />

            <ToastContainer />
            <Component {...pageProps} session={session} />
            <Analytics />
          </MainLayout>
          {router.pathname === "/" ? null : <Footer />}
        </ToastProvider>
      )}
    </>
  );
}

export default MyApp;
