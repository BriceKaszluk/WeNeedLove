import React, { useState } from 'react';
import style from './styles/AnswerComment.module.scss';

export default function AnswerComment() {

  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userAnswer, 'submitted');
  }

  return (
    <form className={style.wrap}>
      <div className={style.text_area_wrap}>
        <div className={style.text_area_box}>
          <textarea 
          className={style.text_area} 
          name="myInput" 
          placeholder="You are not alone my friend..." 
          cols="100" 
          rows="10" 
          minLength="50" 
          maxLength="500" 
          required
          onChange={(e) => {
            setUserAnswer(e.target.value);
          }}
          >
          </textarea>
        </div>
      </div>
      <button 
      className={style.submit_button} 
      onClick={(e) => {handleSubmit(e)}}
      type="submit" 
      name="submitUserAnswer"
      >
        Send Love
      </button>
    </form>
  )
}
