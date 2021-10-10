import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './styles/SignIn.module.scss';
import toaster from '../../services/toaster';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {redirectTo: `${window.location.protocol}//${window.location.host}/update-password`})
      if (error) throw error
      if(data) {
        toaster.success('Success', 'An email has been sent to you');
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
        <h3 className="margin_bottom_medium">Recovery password</h3>
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
      
        <button
          type="submit"
          className={`button ${styles.button_margin}`}
          disabled={loading}
        >
          <span className={styles.button_text}>{loading ? 'Loading' : 'Send recovery password email'}</span>
        </button>
      </form>
  )
}

//TODO: forgot your password
