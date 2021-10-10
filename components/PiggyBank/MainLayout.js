import React, { useState } from 'react';
import OneStory from './OneStory';
import Comments from './Comments';
import MyEmotionsCounter from '../common/MyEmotionsCounter';
import TotalCommentsDone from '../common/TotalCommentsDone';
import Link from "next/link";
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({stories, countedEmotions, totalCommentsDone, lastTimeSeen}) {

  return (
    <div className={styles.wrap}>
      <h1>Piggy Bank</h1>
      <p className="page_description_text">View <strong>community comments</strong> on your stories and like those who have <strong>helped you</strong>😍. Other features are in progress, <strong>stay tuned</strong>!😊</p>
      <div className={styles.counters_wrap}>
        <TotalCommentsDone totalCommentsDone={totalCommentsDone}  />
        <MyEmotionsCounter countedEmotions={countedEmotions} />
      </div>
      <div className={styles.your_story_title_wrap}>
        <h2>Your Stories</h2>
        <Link href="/need-love">
          <a className={`button ${styles.button_give}`}>Write story</a>
        </Link>
      </div>
      {
        stories && stories.length == 0 && 
        <div className='flex_column_centered'>
          <span className={styles.main_text}>you have no story to consult at the moment</span>
          <Link href='/need-love'>
            <a className={`button ${styles.link_wrap}`}>
              <span className={styles.link_to_needLove}>create one now!</span>
            </a>
          </Link>
        </div>
      }
      <div className={styles.row_grid}>
        {
          stories && stories.map(story => {
            return (
              <div key={story.id} className={`${styles.row_wrap}`}>
                <div className={styles.story_wrap}>
                <OneStory story={story} />
                </div>
                <Comments comments={story.comments} lastTimeSeen={lastTimeSeen}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
