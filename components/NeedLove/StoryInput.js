import React, { useState } from 'react';
import styles from './styles/StoryInput.module.scss';
import { supabase } from '../../services/supabaseClient';
import { useToasterContext } from '../../contexts/ToasterContext';

export default function StoryInput() {

  const [storyTitle, setStoryTitle] = useState('');
  const [userStory, setUserStory] = useState('');

  const { addToast } = useToasterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('stories').insert([{ title: storyTitle, text: userStory, user_id: user.id }]);
      if(error) {
        throw error;
      } 
      if(data) {
        setStoryTitle('');
        setUserStory('');
        addToast({
          message: 'Ton histoire est partagée, bravo pour ce premier pas !',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    }
  }

  return (
    <form 
    className={styles.wrap}
    onSubmit={handleSubmit}
    >
      <div>
        <input 
          autoFocus
          type="text" 
          name="story_title" 
          className={styles.title_input}
          placeholder="Titre de ton histoire" 
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
            placeholder="Dis nous en un peu plus..." 
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
        className={`button`}
        type="submit" 
        name="submitUserStory"
        >
          <span className={styles.button_text}>Partager mon histoire</span>
        </button>
      </div>
    </form>
  )
}
