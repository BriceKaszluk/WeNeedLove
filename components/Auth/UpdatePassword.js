import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
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
      if(!accessToken) throw new Error('Tu dois cliquer sur le lien pour changer le mot de passe')
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
      className="w-full max-w-sm mx-auto my-8"
    >
      <h3 className="text-lg font-bold mb-4">Mettre à jour le mot de passe</h3>

      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="mot de passe"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <input
        id="password2"
        name="password2"
        type="password"
        placeholder="confirmation"
        required
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        className="mt-3 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="submit"
        className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Modifier le mot de passe'}
      </button>
    </form>
  )
}
