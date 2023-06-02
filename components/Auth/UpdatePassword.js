import React, { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useToasterContext } from '../../contexts/ToasterContext';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function UpdatePassword() {

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false);
const [showPassword2, setShowPassword2] = useState(false);
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
      className="w-full max-w-sm mx-auto my-8 w-full max-w-sm mx-auto bg-white p-8 shadow-md"
    >
      <h3 className="text-lg font-bold mb-4">Mettre à jour le mot de passe</h3>

      <label htmlFor="password" className="block text-gray-700">Nouveau moot de passe</label>
<div className="relative">
  <input
    id="password"
    name="mot de passe"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type={showPassword ? "text" : "password"}
    placeholder="mot de passe"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
    <button
      onClick={() => setShowPassword(!showPassword)}
      type="button"
    >
      {showPassword ? (
        <span className="text-gray-500 text-sm"><FontAwesomeIcon icon={faEyeSlash} /></span>
      ) : (
        <span className="text-gray-500 text-sm"><FontAwesomeIcon icon={faEye} /></span>
      )}
    </button>
  </div>
</div>

<label htmlFor="password2" className="block text-gray-700">Confirmer le mot de passe</label>
<div className="relative">
  <input
    id="password2"
    name="confirmer le mot de passe"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type={showPassword2 ? "text" : "password"}
    placeholder="confirmation"
    required
    value={password2}
    onChange={(e) => setPassword2(e.target.value)}
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
    <button
      onClick={() => setShowPassword2(!showPassword2)}
      type="button"
    >
      {showPassword2 ? (
        <span className="text-gray-500 text-sm"><FontAwesomeIcon icon={faEyeSlash} /></span>
      ) : (
        <span className="text-gray-500 text-sm"><FontAwesomeIcon icon={faEye} /></span>
      )}
    </button>
  </div>
</div>
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
