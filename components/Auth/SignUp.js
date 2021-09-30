import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

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
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        className="inputField"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        className="inputField"
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="password2"
        name="password2"
        className="inputField"
        type="password"
        placeholder="repeat your password"
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