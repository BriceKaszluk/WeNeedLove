import React from 'react';
import StoryInput from './StoryInput';
import style from './styles/MainLayout.module.scss';

export default function MainLayout() {

  return (
    <div className={style.wrap}>   
      <h1>Need Love</h1>
      <StoryInput />
    </div>
  )
}
