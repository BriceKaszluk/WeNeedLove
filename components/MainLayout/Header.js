import React from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import { useRouter } from "next/router";
import Heart from '../common/Heart';
import GiveHeart from '../common/GiveHeart';
import PiggyBank from '../common/PiggyBank';
import styles from './styles/Header.module.scss';

export default function Header({session}) {

  const router = useRouter();
  
  return(
    <div className={`flexbox flex_between ${styles.wrap}`}>
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
      {
        (router.asPath !== '/' && router.asPath !== '/signIn' && router.asPath !== '/signUp') && 
        <div className={`flex_evenly ${styles.buttons_wrap} ${styles.width}`}>
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
      {
        session &&
        <div className={`${styles.width} ${router.asPath === '/' ? '' : `${styles.logout_wrap}`}`}>
          <button className="button" onClick={() => supabase.auth.signOut()}>
            <span className={styles.button_text}>Sign Out</span>
          </button>
        </div>
      }
    </div>
  )
}

//TODO: header pas là quand sur signup and signin
