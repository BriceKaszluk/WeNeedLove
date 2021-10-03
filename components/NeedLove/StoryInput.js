import React, { useState } from 'react';
import styles from './styles/StoryInput.module.scss';
import { supabase } from '../../services/supabaseClient';
import toaster from '../../services/toaster';

export default function StoryInput() {

  const [storyTitle, setStoryTitle] = useState('');
  const [userStory, setUserStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('stories').insert([{ title: storyTitle, text: userStory, user_id: user.id }]);
      if(error) {
        toaster.error('Error', 'Can\'t post your story');
        throw error;
      } 
      if(data) {
        setStoryTitle('');
        setUserStory('');
        toaster.success('Successfully posted', 'Congrats! your story is online!');
      }
    } catch (error) {
      console.log(error.error_description || error.message)
    }
  }

  return (
    <form 
    className={styles.wrap}
    onSubmit={handleSubmit}
    >
      <div>
        <input 
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
      <div>
        <div className={styles.text_area_box}>
          <textarea 
            className={styles.text_area} 
            name="story" 
            placeholder="Tell us about your story..." 
            cols="100" 
            rows="10" 
            required
            value={userStory}
            onChange={(e) => {
              setUserStory(e.target.value);
            }}
          >
          </textarea>
        </div>
      </div>
      <div className="margin_button_wrap">
        <button 
        className={`button ${styles.button_margin}`}
        type="submit" 
        name="submitUserStory"
        >
          <span className={styles.button_text}>Share my story</span>
        </button>
      </div>
    </form>
  )
}
