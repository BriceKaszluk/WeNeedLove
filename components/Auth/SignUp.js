import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import styles from './styles/SignUp.module.scss';
import { useToasterContext } from '../../contexts/ToasterContext';

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { addToast } = useToasterContext();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(password !== password2) {
      addToast({
        message: 'Les mots de passe ne correspondent pas',
        type: 'error',
      });
      return
    }
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signUp({ email, password })
      if(user && session) {
        addToast({
          message: 'Ton compte est créé, bienvenue parmis nous !',
          type: 'success',
        });
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
      onSubmit={handleSignUp}
      className={`${styles.wrap}`}
    >
      <h3 className="margin_bottom_medium">Créer un compte</h3>
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
          <div className="wrap_subtext_input"><span className="subtext_below_input">Tu as déjà un compte ?</span><span className="link_below_input"> se connecter à mon compte</span></div>
        </a>
      </Link>
      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="mot de passe"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="password2"
        name="password2"
        className={styles.inputField}
        type="password"
        placeholder="répéter le mot de passe"
        required
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button
        type="submit"
        className={`button ${styles.button_margin}`}
        disabled={loading}
      >
        <span className={styles.button_text}>{loading ? 'Loading' : 'Inscription'}</span>
      </button>
    </form>
  )
}
