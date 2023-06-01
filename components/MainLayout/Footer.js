import React from 'react';
import styles from './styles/Footer.module.scss';

export default function Footer() {
  return(
<footer className="bg-gray-800 text-white px-6 py-4">
  <div className="container mx-auto flex flex-wrap justify-between items-center">
    <div className="w-full md:w-auto mb-4 md:mb-0 text-center md:text-left">
      <a href="mailto:webvista.developpeur@gmail.com" className="text-lg font-semibold">Contact</a>
    </div>
    <nav className="w-full md:w-auto text-center md:text-right">
      <a href="/piggy-bank" className="text-gray-400 hover:text-white ml-0 md:ml-4 mt-2 md:mt-0 block md:inline-block">Mon espace</a>
      <a href="/give-love" className="text-gray-400 hover:text-white ml-0 md:ml-4 mt-2 md:mt-0 block md:inline-block">Mes commentaires</a>
      <a href="/need-love" className="text-gray-400 hover:text-white ml-0 md:ml-4 mt-2 md:mt-0 block md:inline-block">Mes histoires</a>
      <a href="/cgu-cgv" className="text-gray-400 hover:text-white ml-0 md:ml-4 mt-2 md:mt-0 block md:inline-block">CGV/CGU</a>
    </nav>
  </div>
</footer>

  )
}
