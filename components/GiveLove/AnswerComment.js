import React, { useState } from 'react';
import style from './styles/AnswerComment.module.scss';
import { supabase } from '../../services/supabaseClient';

export default function AnswerComment({story}) {

  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('comments').insert([{ text: userAnswer, user_id: user.id, story_id: story.id }]);
      if(data) {
        setUserAnswer('');
        alert('congrats! your sended love!');
      }
      if(error) {
        throw error;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <form 
    className={style.wrap}
    onSubmit={handleSubmit}
    >
      <div className={style.text_area_wrap}>
        <div className={style.text_area_box}>
          <textarea 
          className={style.text_area} 
          name="myInput" 
          placeholder="You are not alone my friend..." 
          cols="100" 
          rows="10" 
          maxLength="500" 
          required
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
          }}
          >
          </textarea>
        </div>
      </div>
      <button 
      className={style.submit_button} 
      type="submit" 
      name="submitUserAnswer"
      >
        Send Love
      </button>
    </form>
  )
}
