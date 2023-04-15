import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import styles from './styles/SignUp.module.scss';
import { useToasterContext } from '../../contexts/ToasterContext';
import { useRouter } from "next/router";

export default function UpdatePassword() {

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { addToast } = useToasterContext();
  const router = useRouter();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if(password !== password2) {
      addToast({
        message: 'Les mots de passe ne correspondent pas',
        type: 'error',
      });
      return;
    }
    try {
      setLoading(true)
      const accessToken = router.asPath.match(/access_token=([^&]*)/)?.[1];
      if(!accessToken) throw new Error('You have to click on the email link to change your password')
      const { error, data } = await supabase.auth.api.updateUser(accessToken, { password : password })
      if(data) {
        addToast({
          message: 'Ton mot de passe a bien été modifié',
          type: 'success',
        });
        router.push('/piggy-bank');
      }
      if (error) {
        throw error
      } 
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleUpdatePassword}
      className={`${styles.wrap}`}
    >
      <h3 className="margin_bottom_medium">Update your password</h3>

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
        <span className={styles.button_text}>{loading ? 'Loading' : 'Update password'}</span>
      </button>
    </form>
  )
}
