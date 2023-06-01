import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useToasterContext } from '../../contexts/ToasterContext';
import { useRouter } from "next/router";

export default function SignUp({setSignUp}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { addToast } = useToasterContext();
  const router = useRouter();

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
  className="w-full max-w-sm mx-auto bg-white p-8 shadow-md"
>
  <h3 className="mb-4 text-xl font-bold text-gray-900">Créer un compte</h3>
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
        <span>Tu as déjà un compte ?</span>
        <span onClick={() => router.push('/?auth=signin') } className="text-blue-500 hover:text-blue-700 transition duration-150 cursor-pointer">se connecter à mon compte</span>
      </div>
  <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
  <input
    id="password"
    name="mot de passe"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type="password"
    placeholder="mot de passe"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <label htmlFor="password2" className="block text-gray-700">Confirmer le mot de passe</label>
  <input
    id="password2"
    name="confirmer le mot de passe"
    className="mt-1 mb-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
    type="password"
    placeholder="confirmation"
    required
    value={password2}
    onChange={(e) => setPassword2(e.target.value)}
  />
  <button
    type="submit"
    className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? 'Chargement...' : 'Inscription'}
  </button>
</form>

  )
}
