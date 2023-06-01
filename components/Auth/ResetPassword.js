import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
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
    <form className="w-full max-w-sm mx-auto bg-white p-8 shadow-md" onSubmit={handleResetPassword}>
      <h3 className="text-lg font-bold mb-4">Récupérer mon mot de passe</h3>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        name="email"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type="email"
        placeholder="john@doe.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50' : ''}`} disabled={loading}>
        {loading ? 'Chargement' : 'Envoyer un mail de récupération'}
      </button>
    </form>
  );
}
