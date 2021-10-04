import React from 'react';
import style from './styles/OneStoryCard.module.scss';

export default function OneStoryCard({story}) {

  return (
    <div className={style.wrap}>
      {/* <div 
        className={style.image}>
      </div> */}
      <div className={`${style.story_wrap}`}>
        <h3 className="story_title" >{story.title}</h3>
        <p className="story_text" >{story.text}</p>
      </div>
    </div>
  )
}
