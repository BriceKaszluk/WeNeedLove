import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Link from "next/link";
import { useRouter } from "next/router";
import {useToasterContext} from '../../contexts/ToasterContext';

export default function SignIn({setSignUp}) {
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
  className="w-full max-w-sm mx-auto bg-white p-8 shadow-md"
  onSubmit={handleLogin}
>
  <h3 className="mb-4 text-xl font-bold text-gray-900">Connexion</h3>
  <label htmlFor="email" className="block text-gray-700">Email</label>
  <input
    id="email"
    name="email"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type="email"
    placeholder="john@doe.com"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Tu es nouveau ?</span>
        <span onClick={() => router.push('/?auth=signup') } className="text-blue-500 hover:text-blue-700 transition duration-150 cursor-pointer">Créer un compte</span>
      </div>
  <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
  <input
    id="password"
    name="password"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type="password"
    placeholder="mot de passe"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>mot de passe oublié ?</span>
        <span onClick={() => router.push('/?auth=resetPassword') } className="text-blue-500 hover:text-blue-700 transition duration-150 cursor-pointer">Envoyer un nouveau</span>
      </div>
  <button
    type="submit"
    className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? 'Chargement...' : 'Connexion'}
  </button>
</form>

  )
}

//TODO: forgot your password
