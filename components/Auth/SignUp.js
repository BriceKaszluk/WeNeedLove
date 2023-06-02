import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { useToasterContext } from "../../contexts/ToasterContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp({ setSignUp }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { addToast } = useToasterContext();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      addToast({
        message: "Les mots de passe ne correspondent pas",
        type: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (user && session) {
        addToast({
          message: "Ton compte est créé, bienvenue parmis nous !",
          type: "success",
        });
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="w-full max-w-sm mx-auto bg-white p-8 shadow-md"
    >
      <h3 className="mb-4 text-xl font-bold text-gray-900">Créer un compte</h3>
      <label htmlFor="email" className="block text-gray-700">
        Email
      </label>
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
        <span
          onClick={() => router.push("/?auth=signin")}
          className="text-blue-500 hover:text-blue-700 transition duration-150 cursor-pointer"
        >
          se connecter à mon compte
        </span>
      </div>
      <label htmlFor="password" className="block text-gray-700">
        Mot de passe
      </label>
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
          <button onClick={() => setShowPassword(!showPassword)} type="button">
            {showPassword ? (
              <span className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faEye} />
              </span>
            )}
          </button>
        </div>
      </div>

      <label htmlFor="password2" className="block text-gray-700">
        Confirmer le mot de passe
      </label>
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
              <span className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faEye} />
              </span>
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Chargement..." : "Inscription"}
      </button>
    </form>
  );
}
