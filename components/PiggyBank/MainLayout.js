import React, { useState, useEffect} from 'react';
import OneRowStory from './OneRowStory';
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({stories}) {

  return (
    <div className={styles.wrap}>
      {
        stories && 
        <OneRowStory stories={stories} />
      }
    </div>
  )
}
