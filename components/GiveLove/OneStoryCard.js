import React from 'react';
import style from './styles/OneStoryCard.module.scss';
import arrow from '../../assets/down-arrow.svg';
import Image from 'next/image'

export default function OneStoryCard({story, fetchRandomStory}) {

  return (
    <div className={style.wrap}>
      {/* <div 
        className={style.image}>
      </div> */}
      <div className={`${style.story_wrap}`}>
        <h3 className="story_title" >{story.title}</h3>
        <p className="story_text" >{story.text}</p>
      </div>
      <div 
      onClick={() => fetchRandomStory()}
      className={`button_round ${style.arrow_wrap}`}>
        <Image
          className={style.arrow}
          src={arrow}
          alt="arrow for next story"
        />
      </div>
    </div>
  )
}
