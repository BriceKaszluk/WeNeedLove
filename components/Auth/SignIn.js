import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({  email,  password })
      if (error) throw error
      console.log(user, 'le user');
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'login'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}