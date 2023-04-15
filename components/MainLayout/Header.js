import React, { useState, useEffect} from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import { useRouter } from "next/router";
import Heart from '../common/Heart';
import GiveHeart from '../common/GiveHeart';
import PiggyBank from '../common/PiggyBank';
import styles from './styles/Header.module.scss';
import BurgerIcon from '../common/BurgerIcon';
import { useToasterContext } from '../../contexts/ToasterContext';

const NOT_REDIRECTING_URLS = ['/', '/signIn', '/signUp', '/reset-password', '/update-password'];

export default function Header({session}) {

  const router = useRouter();

  const [counterNotif, setCounterNotif] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  const { addToast } = useToasterContext();

  useEffect(() => {
    if (session) {
      async function fetchCounterNotif () {
        try {
          const { data, error } = await supabase.rpc('count_notifications');
          if (error) throw error;
          setCounterNotif(data)
        } catch(error) {
          addToast({
            message: error.error_description || error.message,
            type: 'error',
          });
        }
      }

      fetchCounterNotif();
    }
  }, [session, router?.pathname])

  return(
    <div className={`flex_between ${styles.wrap}`}>
      <div className={`hide_on_small_screen ${styles.width}`}>
        <Link href={session ? '/piggy-bank' : '/'}>
          <a>
            <div className={styles.logo}>WeNeedLove</div>
          </a>
        </Link>
      </div>

        {
          (!NOT_REDIRECTING_URLS.includes(router.pathname)) && 
          <div className={styles.burger_wrap}>
            <div className={`hide_on_large_screen ${styles.button_burger}`}
            >
              <BurgerIcon showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
            </div>
            <div className={`${showNavbar ? `${styles.mobile_wrap}` : styles.buttons_wrap}`}>
              <div className={`flex_centered button_round ${router.pathname == '/need-love' ? 'active_button' : ''}`}>
                <Heart />
              </div>
              <div className={`flex_centered button_round ${router.pathname == '/give-love' ? 'active_button' : ''}`}>
                <GiveHeart />
              </div>
              <div className={`flex_centered button_round ${router.pathname == '/piggy-bank' ? 'active_button' : ''}`}>
                <PiggyBank counterNotif={counterNotif} />
              </div>
              {
                (session) &&
                <div className="flex_centered button_round hide_on_large_screen">
                  <button 
                    className={`button_image ${styles.logout_button}`} 
                    onClick={() => {
                      supabase.auth.signOut();
                    }}
                  >
                  </button>
                </div>
              }
            </div>
          </div>
        }

      {
        (session) &&
        <div className={`${styles.width} ${styles.logout_wrap}`}>
          <button 
            className="button hide_on_small_screen" 
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            <span className={styles.button_text}>Déconnexion</span>
          </button>
        </div>
      }
      {
        (!session && router.pathname !== '/signIn' && router.pathname !== '/signUp' && router.pathname !== '/reset-password') && 
        <div className={router.pathname === '/' ? `${styles.home_auth}` : `flex_around ${styles.auth_wrap}`}>
          <Link href='/signIn'>
            <a>
              <div className="button">Connexion</div>
            </a>
          </Link>
          <Link href='/signUp'>
            <a>
              <div className="button">Inscription</div>
            </a>
          </Link>
        </div>
      }
    </div>
  )
}

//TODO: changer les !isNavigator après le dev
//TODO: changer le weneedlove mobile mettre ne gros titre - signin/signout
//TODO: transition smooth burger mobile
//TODO: fixer le header
