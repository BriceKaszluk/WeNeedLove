import React from 'react';
import style from './styles/OneStoryCard.module.scss';

export default function OneStoryCard({story}) {

  return (
    <div className={style.wrap}>
      <div 
        className={style.image} 
        style={{backgroundImage: `url(${story.image})`}}>
      </div>
      <div className={`${style.ripple} ${style.infos_wrap}`}>
        <h3 className={style.title} >{story.title}</h3>
        <p className={style.text} >{story.text}</p>
      </div>
    </div>
  )
}
