import React from 'react';
import StoriesRows from './StoriesRows';
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
        stories && 
        <StoriesRows stories={stories} lastTimeSeen={lastTimeSeen} />
      }
    </div>
  )
}
