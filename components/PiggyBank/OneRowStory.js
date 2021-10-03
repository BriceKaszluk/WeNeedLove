import React, { useState, useEffect} from 'react';
import styles from './styles/OneRowStory.module.scss';
import truncate from '../../services/truncateString';
import Link from "next/link";

export default function OneRowStory({stories}) {

  return (
    <div>
      {
        stories.length == 0 && 
        <div className='flex_column_centered'>
          <span className={styles.main_text}>you have no story to consult at the moment</span>
          <Link href='/need-love'>
            <a className={`button ${styles.link_wrap}`}>
              <span className={styles.link_to_needLove}>create one now!</span>
            </a>
          </Link>
        </div>
      }
      {
        stories && stories.map(story => {
          return (
            <div key={story.id} className={`${styles.row_wrap}`}>
              <div className={styles.story_wrap}>
                <h2 className="story_title">{story.title}</h2>
                <p className="story_text">{truncate(story.text, 150)}...</p>
              </div>
              <div className={styles.border_bottom}></div>
              <div className={styles.comment_wrap}>
                <h3 className="story_comments_title">Comments</h3>
                {
                  story.comments.map(com => {
                    return (
                      <div key={com.id}>
                        <p >{com.text}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
