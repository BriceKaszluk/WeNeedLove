import React, { useState, useEffect} from 'react';
import styles from './styles/Comments.module.scss';
import EmotionsRail from '../common/EmotionsRail';

export default function OneRowStory({story}) {

  const [showComments, setShowComments] = useState(false);
  console.log(story, 'la sotory');

  return (
  <div className={styles.comment_wrap}>
    <div 
    className={`flexbox ${styles.form_comment}`}
    onClick={() => {setShowComments(!showComments)}}
    >
      <span className="story_comments_title">Comments</span>
      <div className={`arrow_down ${showComments && styles.flip_horizontal_bottom}`}></div>
    </div>
    <div  className={showComments ? "show_accordion" : "hide_accordion"}>
      {
        story.comments.map(com => {
          return (
            <div key={com.id} className="flexbox">
              <EmotionsRail emotion={com.comments_emotions[0]?.emotion_id} comment={com}/>
              <div>
                <p className={`justify_text ${styles.comment_border}`}>{com.text}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}