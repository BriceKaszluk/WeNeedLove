import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import Link from "next/link";
import styles from './styles/SignIn.module.scss';

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
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={`${styles.wrap}`}
      onSubmit={handleLogin}
    >
      <label htmlFor="email">Email</label>
      <div>
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
      </div>
      <Link href='/signUp'>
        <a>
          <div className="wrap_subtext_input"><span className="subtext_below_input">need an account?</span><span className="link_below_input"> Sign up</span></div>
        </a>
      </Link>
      <label htmlFor="password">Password</label>
      <div>
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
      </div>
      <Link href='/reset-password'>
        <a>
          <div className="wrap_subtext_input"><span className="subtext_below_input">Forgot your password?</span><span className="link_below_input"> Send new</span></div>
        </a>
      </Link>
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
