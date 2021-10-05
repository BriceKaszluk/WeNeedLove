import React, { useState, useEffect} from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import { useRouter } from "next/router";
import Heart from '../common/Heart';
import GiveHeart from '../common/GiveHeart';
import PiggyBank from '../common/PiggyBank';
import styles from './styles/Header.module.scss';
import BurgerIcon from '../common/BurgerIcon';

export default function Header({session}) {

  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(false);

  return(
    <div className={`flex_between ${styles.wrap}`}>
      {
        router.asPath !== '/' && 
        <div className={styles.width}>
          <Link href='/'>
            <a>
              <div className={styles.logo}>WeNeedLove</div>
            </a>
          </Link>
        </div>
      }
      <div className={styles.burger_wrap}>
        <div 
        className={`hide_on_large_screen ${styles.button_burger}`}
        ><BurgerIcon showNavbar={showNavbar} setShowNavbar={setShowNavbar}/></div>
        {
          (router.asPath !== '/' && router.asPath !== '/signIn' && router.asPath !== '/signUp') && 
          <div className={`${showNavbar ? `${styles.mobile_wrap}` : styles.buttons_wrap}`}>
            <div className={`flex_centered button_round ${router.asPath == '/need-love' ? 'active_button' : ''}`}>
              <Heart />
            </div>
            <div className={`flex_centered button_round ${router.asPath == '/give-love' ? 'active_button' : ''}`}>
              <GiveHeart />
            </div>
            <div className={`flex_centered button_round ${router.asPath == '/piggy-bank' ? 'active_button' : ''}`}>
              <PiggyBank />
            </div>
          </div>
        }
      </div>
      {
        (session) &&
        <div className={`${styles.width} ${styles.logout_wrap}`}>
          <button className="button hide_on_small_screen" onClick={() => supabase.auth.signOut()}>
            <span className={styles.button_text}>Sign Out</span>
          </button>
        </div>
      }
      {
        (!session && router.asPath !== '/signIn' && router.asPath !== '/signUp') && 
        <div className={router.asPath === '/' ? `${styles.home_auth}` : `flex_around ${styles.auth_wrap}`}>
          <Link href='/signIn'>
            <a>
              <div className="button">Sign in</div>
            </a>
          </Link>
          <Link href='/signUp'>
            <a>
              <div className="button">Sign up</div>
            </a>
          </Link>
        </div>
      }
    </div>
  )
}

//TODO: changer les !isNavigator après le dev
