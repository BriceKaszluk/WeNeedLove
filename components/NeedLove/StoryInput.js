import React, { useState } from 'react';
import style from './styles/StoryInput.module.scss';

export default function StoryInput() {

  const [storyTitle, setStoryTitle] = useState('');
  const [userStory, setUserStory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!storyTitle.length) {
       return console.log('enter a title');
    } else if(userStory.length < 50) {
        return console.log('enter a story');
      }
    console.log(storyTitle, userStory, 'form submitted');
  }

  return (
    <form className={style.wrap}>
      <div className={style.title_input_box} >
        <input 
          className={style.title_input} 
          type="text" 
          name="story_title" 
          placeholder="My story title" 
          size="30" 
          spellCheck 
          required
          onChange={(e) => {
            setStoryTitle(e.target.value);
          }}
        >
        </input>
      </div>
      <div className={style.text_area_wrap}>
        <div className={style.text_area_box}>
          <textarea 
            className={style.text_area} 
            name="story" 
            placeholder="Tell us about your story..." 
            cols="100" 
            rows="10" 
            minLength="50" 
            maxLength="500" 
            required
            onChange={(e) => {
              setUserStory(e.target.value);
            }}
          >
          </textarea>
        </div>
      </div>
      <button 
      className={style.submit_button} 
      onClick={(e) => {handleSubmit(e)}}
      type="submit" 
      name="submitUserStory"
      >
        Share my story
      </button>
    </form>
  )
}
