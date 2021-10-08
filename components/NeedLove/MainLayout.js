import React from 'react';
import StoryInput from './StoryInput';
import style from './styles/MainLayout.module.scss';

export default function MainLayout() {

  return (
    <div className={style.wrap}>   
      <h1>Need Love</h1>
      <p className="page_description_text"><strong>Tell your story</strong>, the community will support you without prejudice, <strong>it&apos;s anonymous😎 </strong>!</p>
      <StoryInput />
    </div>
  )
}
