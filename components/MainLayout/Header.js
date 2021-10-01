import React from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import { useRouter } from "next/router";
import Heart from '../common/Heart';
import GiveHeart from '../common/GiveHeart';
import PiggyBank from '../common/PiggyBank';

export default function Header({session}) {

  const router = useRouter();
  
  return(
    <div className='flexbox'>
        <Link href='/'>
          <a>
            <div>WeNeedLove</div>
          </a>
        </Link>
      {
      session &&
      <button className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
      }
      {
      !session && 
      <div>
        <Link href='/signIn'>
          <a>
            <div>Sign in</div>
          </a>
        </Link>
        <Link href='/signUp'>
          <a>
            <div>Sign up</div>
          </a>
        </Link>
      </div>
      }
      {
        router.asPath !== '/' && 
        <div className='flexbox'>
          <Heart />
          <GiveHeart />
          <PiggyBank />
        </div>
      }
    </div>
  )
}