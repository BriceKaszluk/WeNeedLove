import React, { useState, useContext } from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import styles from './styles/SignIn.module.scss';
import { useRouter } from "next/router";
import {useToasterContext} from '../../contexts/ToasterContext';

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();
  const { addToast, toasts } = useToasterContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({  email,  password })
      if (error) throw error
      if(user && session) {
        let redirectUrl = sessionStorage.getItem('redirectUrl');
        if(redirectUrl) {
          router.push(redirectUrl);
          sessionStorage.removeItem('redirectUrl');
        }
        addToast({
          message: 'Connexion réussie !',
          type: 'success',
        });
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
        className={`${styles.wrap}`}
        onSubmit={handleLogin}
      >
        <h3 className="margin_bottom_medium">Connexion</h3>
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
            <div className="wrap_subtext_input"><span className="subtext_below_input">Tu est nouveau ?</span><span className="link_below_input"> Créer un compte</span></div>
          </a>
        </Link>
        <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="inputField"
            type="password"
            placeholder="mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <Link href="/reset-password">
          <a>
            <div className="wrap_subtext_input"><span className="subtext_below_input">mot de passe oublié ?</span><span className="link_below_input"> Envoyer un nouveau</span></div>
          </a>
        </Link>
        <button
          type="submit"
          className={`button ${styles.button_margin}`}
          disabled={loading}
        >
          <span className={styles.button_text}>{loading ? 'Chargement...' : 'Connexion'}</span>
        </button>
      </form>
  )
}

//TODO: forgot your password
