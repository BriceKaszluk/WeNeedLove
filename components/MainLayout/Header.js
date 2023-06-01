import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import Heart from "../common/Heart";
import GiveHeart from "../common/GiveHeart";
import PiggyBank from "../common/PiggyBank";
import styles from "./styles/Header.module.scss";
import BurgerIcon from "../common/BurgerIcon";
import { useToasterContext } from "../../contexts/ToasterContext";

const NOT_REDIRECTING_URLS = [
  "/",
  "/signIn",
  "/signUp",
  "/reset-password",
  "/update-password",
];

export default function Header({ session }) {
  const router = useRouter();

  const [counterNotif, setCounterNotif] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  const { addToast } = useToasterContext();

  useEffect(() => {
    if (session) {
      async function fetchCounterNotif() {
        try {
          const { data, error } = await supabase.rpc("count_notifications");
          if (error) throw error;
          setCounterNotif(data);
        } catch (error) {
          addToast({
            message: error.error_description || error.message,
            type: "error",
          });
        }
      }

      fetchCounterNotif();
    }
  }, [session, router?.pathname]);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {router.pathname == "/" ? null : (
        <div className="hidden md:block">
          <Link legacyBehavior href={session ? "/piggy-bank" : "/"}>
            <a>
              <div className="text-2xl font-semibold text-indigo-600">
                WeNeedLove
              </div>
            </a>
          </Link>
        </div>
      )}
      {!NOT_REDIRECTING_URLS.includes(router.pathname) && (
        <div className="relative">
          <div className="md:hidden">
            <BurgerIcon showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
          </div>
          <div
            className={`${showNavbar ? "block" : "hidden"} md:flex md:space-x-8`}
          >
            <div
              className={`mt-3 md:mt-0 ${
                router.pathname == "/need-love" ? "text-indigo-600" : ""
              }`}
            >
              <Heart />
            </div>
            <div
              className={`mt-3 md:mt-0 ${
                router.pathname == "/give-love" ? "text-indigo-600" : ""
              }`}
            >
              <GiveHeart />
            </div>
            <div
              className={`mt-3 md:mt-0 ${
                router.pathname == "/piggy-bank" ? "text-indigo-600" : ""
              }`}
            >
              <PiggyBank counterNotif={counterNotif} />
            </div>
          </div>
        </div>
      )}

      {session && (
        <div className=" md:block mb-auto md:my-auto">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-300"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

//TODO: changer les !isNavigator après le dev
//TODO: changer le weneedlove mobile mettre ne gros titre - signin/signout
//TODO: transition smooth burger mobile
//TODO: fixer le header
