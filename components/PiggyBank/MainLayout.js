import React from 'react';
import StoriesRows from './StoriesRows';
import MyEmotionsCounter from '../common/MyEmotionsCounter';
import TotalCommentsDone from '../common/TotalCommentsDone';
import Link from "next/link";
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({stories, countedEmotions, totalCommentsDone}) {

  return (
    <div className={styles.wrap}>
      <h1>Piggy Bank</h1>
      <div className={styles.counters_wrap}>
        <TotalCommentsDone totalCommentsDone={totalCommentsDone}  />
        <MyEmotionsCounter countedEmotions={countedEmotions} />
      </div>
      <div className={styles.your_story_title_wrap}>
        <h2>Your Stories</h2>
        <Link href="/give-love">
          <a className={`button ${styles.button_give}`}>Write story</a>
        </Link>
      </div>
      {
        stories && 
        <StoriesRows stories={stories} />
      }
    </div>
  )
}
