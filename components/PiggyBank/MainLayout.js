import React, { useState, useEffect} from 'react';
import StoriesRows from './StoriesRows';
import MyEmotionsCounter from '../common/MyEmotionsCounter';
import TotalCommentsDone from '../common/TotalCommentsDone';
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({stories, countedEmotions, totalCommentsDone}) {

  return (
    <div className={styles.wrap}>
      <h1>Piggy Bank</h1>
      <div className="flex_evenly">
        <MyEmotionsCounter countedEmotions={countedEmotions} />
        <TotalCommentsDone totalCommentsDone={totalCommentsDone}  />
      </div>
      <h2>Your Stories</h2>
      {
        stories && 
        <StoriesRows stories={stories} />
      }
    </div>
  )
}
