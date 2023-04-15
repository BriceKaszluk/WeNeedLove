import React from 'react';
import StoryInput from './StoryInput';
import style from './styles/MainLayout.module.scss';

export default function MainLayout() {

  return (
    <div className={style.wrap}>   
      <h1>Besoin d&apos;en parler ?</h1>
      <p className="page_description_text"><strong>Raconte-nous ton histoire</strong>, la communauté te soutiendra avec bienveillance, <strong>ne t&apos;inquiète pas c&apos;est anonyme😎 </strong>!</p>
      <StoryInput />
    </div>
  )
}
