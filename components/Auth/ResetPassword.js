import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './styles/SignIn.module.scss';
import { useToasterContext } from '../../contexts/ToasterContext';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { addToast } = useToasterContext();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: `${window.location.protocol}//${window.location.host}/update-password`,
      });
      if (error) throw error;
      if (data) {
        addToast({
          message: "Nous t'avons envoyé un mail",
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.wrap}`} onSubmit={handleResetPassword}>
      <h3 className="margin_bottom_medium">Récupérer mon mot de passe</h3>
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

      <button type="submit" className={`button ${styles.button_margin}`} disabled={loading}>
        <span className={styles.button_text}>{loading ? 'Chargement' : 'Envoyer un mail de récupération'}</span>
      </button>
    </form>
  );
}
