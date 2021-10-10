import React, { useState, useEffect} from 'react';
import styles from './styles/OneRowStory.module.scss';
import truncate from '../../services/truncateString';
import Link from "next/link";
import Comments from './Comments';

export default function StoriesRows({stories, lastTimeSeen}) {

  const [showComments, setShowComments] = useState(false);

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
      <div className={styles.row_grid}>
        {
          stories && stories.map(story => {
            return (
              <div key={story.id} className={`${styles.row_wrap}`}>
                <div className={styles.story_wrap}>
                  <h2 className="story_title">{truncate(story.title, 10)}</h2>
                  <p className="story_text">{truncate(story.text, 150)}...</p>
                </div>
                <Comments story={story} lastTimeSeen={lastTimeSeen}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
