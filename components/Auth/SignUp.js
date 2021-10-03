import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import Link from "next/link";
import styles from './styles/SignUp.module.scss';

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    if(password !== password2) {
      alert('password dosnt match');
      return
    }
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signUp({  email,  password })
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
      onSubmit={handleLogin}
      className={`${styles.wrap}`}
    >
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
      <Link href='/signIn'>
        <a>
          <div className="wrap_subtext_input"><span className="subtext_below_input">Already joined?</span><span className="link_below_input"> login to your account</span></div>
        </a>
      </Link>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="password2"
        name="password2"
        className={styles.inputField}
        type="password"
        placeholder="repeat your password"
        required
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button
        type="submit"
        className={`button ${styles.button_margin}`}
        disabled={loading}
      >
        <span className={styles.button_text}>{loading ? 'Loading' : 'Sign up'}</span>
      </button>
    </form>
  )
}