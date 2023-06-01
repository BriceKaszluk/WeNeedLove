import React from 'react';
import StoryInput from './StoryInput';
import style from './styles/MainLayout.module.scss';

export default function MainLayout() {

  return (
<div className="flex items-center justify-center">
  <div className="container mx-auto p-4 md:p-8 max-w-screen-lg bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-indigo-600 mb-4">Besoin d'en parler ?</h1>
    <p className="text-lg text-gray-700 mb-6">
      <strong>Raconte-nous ton histoire</strong>, la communauté te soutiendra avec bienveillance, 
      <strong>ne t'inquiète pas c'est anonyme😎 </strong>!
    </p>
    <StoryInput />
  </div>
</div>


  )
}
