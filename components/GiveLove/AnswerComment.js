import React from 'react';
import styles from './styles/AnswerComment.module.scss';

export default function AnswerComment({story, userAnswer, setUserAnswer, handleSubmit}) {

  return (
    <form 
    className={styles.wrap}
    onSubmit={handleSubmit}
    >
      <div className={styles.text_area_box}>
        <textarea 
        autoFocus
        className={styles.text_area} 
        name="myInput" 
        placeholder="Support this person, send him good vibes" 
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
