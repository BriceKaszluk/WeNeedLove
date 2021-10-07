import React, { useState, useEffect} from 'react';
import OneStoryCard from './OneStoryCard';
import AnswerComment from './AnswerComment';
import style from './styles/MainLayout.module.scss';
import { supabase } from '../../services/supabaseClient';
import toaster from '../../services/toaster';

export default function MainLayout() {

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true)

  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase.from('comments').insert([{ text: userAnswer, user_id: user.id, story_id: story.id }]);
      if(data) {
        setUserAnswer('');
        toaster.success('Successfully posted', 'Thank you for sending love');
        fetchRandomStory();
      }
      if(error) {
        throw error;
      }
    }
    catch (error) {
      toaster.error('Error', error.error_description || error.message);
    }
  }

  const fetchRandomStory = async () => {
    try {
      const { data, error } = await supabase.rpc('randomstory');
      if(error) {
        throw error;
      }
      if(data && data.id !== null) {
        setStory(data)
      } else {
        setStory(null);
      }
    } catch(error) {
      toaster.error('Error', error.error_description || error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomStory()
  },[])

  return (
    <div className={style.wrap}>      
      <h1>Give Love</h1>
      <div className={style.input_wrap}>
        {
          (!loading && story) && 
          <>
            <OneStoryCard story={story} />
            <AnswerComment 
              story={story} 
              userAnswer={userAnswer} 
              setUserAnswer={setUserAnswer} 
              handleSubmit={handleSubmit} 
            />
          </>
        }
        {
          (!story && !loading) && 
          <div className={style.come_later}>
            <h2>Sorry, you sent too much love... Come back later!</h2>
          </div>
        }
      </div>
    </div>

  )
}

//TODO: rajouter dans le select pour savoir si un user n'a pas déjà comenté un histoire
//TODO: prévoir un bouton pour changer de story
