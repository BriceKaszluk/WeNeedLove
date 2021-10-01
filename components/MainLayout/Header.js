import React from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";

export default function Header({session}) {
  
  return(
    <div>
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
    </div>
  )
}