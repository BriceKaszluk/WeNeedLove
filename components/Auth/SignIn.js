import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import Link from "next/link";

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
      onSubmit={handleLogin}
    >
      <div>
        <label htmlFor="email">Email</label>
        <Link href='/signUp'>
          <a>
            <div>New? Sign up for an account</div>
          </a>
        </Link>
      </div>
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
      <div>
        <label htmlFor="password">Password</label>
        <Link href='/reset-password'>
          <a>
            <div>Forgot your password?</div>
          </a>
        </Link>
      </div>
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
      <button
        type="submit"
        className="button block"
        disabled={loading}
      >
        <span>{loading ? 'Loading' : 'Sign in'}</span>
      </button>
    </form>
  )
}