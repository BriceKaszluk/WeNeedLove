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
      <h1>Mon trésor</h1>
      <p className="page_description_text">Consulte les <strong>commentaires envoyés par les membres</strong> et réagis à <strong>ceux qui t&apos;ont aidé</strong>😍. D&apos;autres fonctionnalités sont en cours de développement, <strong>un peu de patience</strong>!😊</p>
      <div className={styles.counters_wrap}>
        <TotalCommentsDone totalCommentsDone={totalCommentsDone}  />
        <MyEmotionsCounter countedEmotions={countedEmotions} />
      </div>
      <div className={styles.your_story_title_wrap}>
        <h2>Tes histoires partagées</h2>
        <Link href="/need-love">
          <a className={`button ${styles.button_give}`}>Partager une histoire</a>
        </Link>
      </div>
      {
        stories && stories.length == 0 && 
        <div className='flex_column_centered text-center'>
          <span className={styles.main_text}>Tu n&apos;a pas encore partagé d&apos;histoire pour le moment</span>
          <Link href='/need-love'>
            <a className={`button ${styles.link_wrap}`}>
              <span className={styles.link_to_needLove}>J&apos;aimerais partager</span>
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
