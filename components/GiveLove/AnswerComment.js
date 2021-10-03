import React, { useState } from 'react';
import styles from './styles/AnswerComment.module.scss';
import { supabase } from '../../services/supabaseClient';
import toaster from '../../services/toaster';

export default function AnswerComment({story}) {

  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('comments').insert([{ text: userAnswer, user_id: user.id, story_id: story.id }]);
      if(data) {
        setUserAnswer('');
        toaster.success('Successfully posted', 'Thank you for sending love');
      }
      if(error) {
        toaster.error('Error', 'Can\'t send your love');
        throw error;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <form 
    className={styles.wrap}
    onSubmit={handleSubmit}
    >
      <div className={styles.text_area_box}>
        <textarea 
        className={styles.text_area} 
        name="myInput" 
        placeholder="You are not alone my friend..." 
        cols="100" 
        rows="10" 
        required
        value={userAnswer}
        onChange={(e) => {
          setUserAnswer(e.target.value);
        }}
        >
        </textarea>
      </div>
      <div className={styles.margin_button_wrap}>
        <button 
        className={`button ${styles.button_margin}`}
        type="submit" 
        name="submitUserAnswer"
        >
          <span className={styles.button_text}>Send Love</span>
        </button>
      </div>
    </form>
  )
}
