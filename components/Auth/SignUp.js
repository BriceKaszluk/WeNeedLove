import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import Link from "next/link";

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
    >
      <div>
        <label htmlFor="email">Email</label>
        <Link href='/signIn'>
          <a>
            <div>Already joined? login to your account</div>
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
      <input
        id="password2"
        name="password2"
        className="inputField"
        type="password"
        placeholder="repeat your password"
        required
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button
        type="submit"
        className="button block"
        disabled={loading}
      >
        <span>{loading ? 'Loading' : 'Sign up'}</span>
      </button>
    </form>
  )
}