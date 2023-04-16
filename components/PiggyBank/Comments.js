import React, { useState, useEffect } from 'react';
import styles from './styles/Comments.module.scss';
import EmotionsRail from '../common/EmotionsRail';
import imgTrash from '../../assets/trash.svg';
import Image from 'next/image';
import { useToasterContext } from '../../contexts/ToasterContext';
import { supabase } from '../../services/supabaseClient';

export default function OneRowStory({comments, lastTimeSeen}) {

  const [showComments, setShowComments] = useState(false);
  const [showNew, setShowNew] = useState(true);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasterContext();

  const handleMouseEnter = () => {
    setShowNew(false);
  };

  const handleMouseLeave = () => {
    setShowNew(true);
  };

  const [hasNewComments, setHasNewComments] = useState(false);
  useEffect(() => {
    if (lastTimeSeen && comments && comments.length > 0) {
      const newComments = comments.find(el => new Date(el.created_at) > lastTimeSeen);
      if (newComments) {
        setHasNewComments(newComments);
      }
    }
  }, [lastTimeSeen, comments])

  const deleteComment = async (commentId) => {
    try{
      const { data, error } = await supabase
      .from('comments')
      .delete()
      .match({ id: commentId })
      if(error) throw error;
      if(data) {
        addToast({
          message: 'Ce commentaire a été supprimé',
          type: 'success',
        });
      } 
    }catch(error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

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
    <div  className={showComments ? "display" : "not_display"}>
      {
        comments.map(com => {
          return (
            <div key={com.id} id={com.id} className={`flexbox ${styles.one_comment_wrap}`}>
              <EmotionsRail emotion={com.comments_emotions[0]?.emotion_id} comment={com}/>
              <div>
                <p className={`justify_text ${styles.comment_border}`}>
                  {new Date(com.created_at) > lastTimeSeen && showNew && 
                  <span 
                  className={`${styles.new_pill} ${styles.small_margin_right}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  >New</span>}
                  {com.text}
                </p>
              </div>
              <div 
                onClick={() => {
                    if ( confirm( "Delete this comment?" ) ) {
                      deleteComment(com.id);
                      document.getElementById(com.id).style.display = 'none';
                  }
                }}
                className={`${styles.button_delete_comment} flex_centered not_display`}>
                  <Image
                    src={imgTrash}
                    alt="icon for delete comment"
                  />
              </div>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}
