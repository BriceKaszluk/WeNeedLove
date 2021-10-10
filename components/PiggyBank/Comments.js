import React, { useState, useEffect} from 'react';
import styles from './styles/Comments.module.scss';
import EmotionsRail from '../common/EmotionsRail';

export default function OneRowStory({story, lastTimeSeen}) {

  const [showComments, setShowComments] = useState(false);
  const [hasNewComments, setHasNewComments] = useState(false);
  useEffect(() => {
    if (lastTimeSeen && story?.comments && story.comments.length > 0) {
      const newComments = story.comments.find(el => new Date(el.created_at) > lastTimeSeen);
      if (newComments) {
        setHasNewComments(newComments);
      }
    }
  }, [lastTimeSeen, story])

  return (
  <div className={styles.comment_wrap}>
    <div 
    className={`flexbox ${styles.form_comment}`}
    onClick={() => {setShowComments(!showComments)}}
    >
      <span className="story_comments_title">
        Comments
      </span>
      {
        hasNewComments && <span className={`${styles.new_pill} ${styles.small_margin_left}`}>New</span>
      }
      <div className={`arrow_down ${showComments && styles.flip_horizontal_bottom}`}></div>
    </div>
    <div  className={showComments ? "show_accordion" : "hide_accordion"}>
      {
        story.comments.map(com => {
          return (
            <div key={com.id} className="flexbox">
              <EmotionsRail emotion={com.comments_emotions[0]?.emotion_id} comment={com}/>
              <div>
                <p className={`justify_text ${styles.comment_border}`}>
                  {new Date(com.created_at) > lastTimeSeen && <span className={`${styles.new_pill} ${styles.small_margin_right}`}>New</span>}
                  {com.text}
                </p>
              </div>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}

//TODO: mettre une croix pour supprimer un commentaire + "êtes vous sur de vouloir supprimer ce com?" + toaster confirm
//TODO: IMPORTANT un bouton notification de nouveau commentaire