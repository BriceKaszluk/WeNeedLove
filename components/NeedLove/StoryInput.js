import React, { useState } from 'react';
import style from './styles/StoryInput.module.scss';
import { supabase } from '../../services/supabaseClient';

export default function StoryInput() {

  const [storyTitle, setStoryTitle] = useState('');
  const [userStory, setUserStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('stories').insert([{ title: storyTitle, text: userStory, user_id: user.id }]);
      if(data) {
        setStoryTitle('');
        setUserStory('');
        alert('congrats! your story is online!');
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
      <div className={style.title_input_box} >
        <input 
          className={style.title_input} 
          type="text" 
          name="story_title" 
          placeholder="My story title" 
          size="30" 
          spellCheck 
          required
          value={storyTitle}
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
            value={userStory}
            onChange={(e) => {
              setUserStory(e.target.value);
            }}
          >
          </textarea>
        </div>
      </div>
      <button 
      className={style.submit_button} 
      type="submit" 
      name="submitUserStory"
      >
        Share my story
      </button>
    </form>
  )
}
