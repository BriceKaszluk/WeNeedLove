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
  className="w-full space-y-6"
  onSubmit={handleSubmit}
>
  <div>
    <input 
      autoFocus
      type="text" 
      name="story_title" 
      className="w-full p-2 border-2 border-gray-300 rounded-md"
      placeholder="Titre de ton histoire" 
      size="30" 
      spellCheck 
      required
      value={storyTitle}
      onChange={(e) => {
        setStoryTitle(e.target.value);
      }}
    />
  </div>
  <div>
    <textarea 
      className="w-full p-2 h-48 border-2 border-gray-300 rounded-md" 
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
  <div>
    <button 
      className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-300"
      type="submit" 
      name="submitUserStory"
    >
      <span className="font-semibold">Partager mon histoire</span>
    </button>
  </div>
</form>

  )
}
