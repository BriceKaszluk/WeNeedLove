import React, { useState, useEffect} from 'react';
import styles from './styles/MyEmotionsCounter.module.scss';

export default function MyEmotionsCounter({countedEmotions}) {

  const LOGO = {
    clap: '👏',
    love: '😍',
    tada: '🎉',
    thumbUp: '👍',
    unhappy: '🤔'
  };

  return (
<div className="space-y-4 my-8 md:my-0">
  <h3 className="text-xl font-bold text-indigo-600 text-center">Réaction à mes commentaires</h3>
  <div className="flex justify-center items-center space-x-4">
    {
      Object.keys(LOGO).map((logoName, index) => (
        <div key={index} className="flex flex-col items-center justify-center space-y-2">
          <span className="text-2xl">{LOGO[logoName]}</span>
          <span className="text-xl font-bold text-indigo-600">{countedEmotions ? countedEmotions[logoName] || 0 : 0}</span>
        </div>
      ))
    }
  </div>
</div>

  )
}

//TODO:mettre la constante logo dans un fichier séparé