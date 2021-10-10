import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import styles from './styles/SignIn.module.scss';
import toaster from '../../services/toaster';

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({  email,  password })
      if (error) throw error
      if(user && session) {
        toaster.success('Successfully logged in', 'Share a story or reply to others!');
      }
    } catch (error) {
      toaster.error('Error', error.error_description || error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
      <form
        className={`${styles.wrap}`}
        onSubmit={handleLogin}
      >
        <h3 className="margin_bottom_medium">Sign in</h3>
        <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="inputField"
            type="email"
            placeholder="john@doe.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <Link href='/signUp'>
          <a>
            <div className="wrap_subtext_input"><span className="subtext_below_input">New here?</span><span className="link_below_input"> Create an account</span></div>
          </a>
        </Link>
        <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="inputField"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {/* <Link href='/reset-password'>
          <a>
            <div className="wrap_subtext_input"><span className="subtext_below_input">Forgot your password?</span><span className="link_below_input"> Send new</span></div>
          </a>
        </Link> */}
        <button
          type="submit"
          className={`button ${styles.button_margin}`}
          disabled={loading}
        >
          <span className={styles.button_text}>{loading ? 'Loading' : 'Sign in'}</span>
        </button>
      </form>
  )
}

//TODO: forgot your password
