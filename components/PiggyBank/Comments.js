import React, { useState, useEffect} from 'react';
import styles from './styles/Comments.module.scss';

export default function OneRowStory({story}) {

  const [showComments, setShowComments] = useState(false);

  return (
  <div className={styles.comment_wrap}>
    <div 
    className={`flexbox ${styles.form_comment}`}
    onClick={() => {setShowComments(!showComments)}}
    >
      <span className="story_comments_title">Comments</span>
      <div className="arrow_down"></div>
    </div>
    <div  className={showComments ? "show_accordion" : "hide_accordion"}>
      {
        story.comments.map(com => {
          return (
            <div key={com.id} className={styles.comment_border}>
              <p className="justify_text">{com.text}</p>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}