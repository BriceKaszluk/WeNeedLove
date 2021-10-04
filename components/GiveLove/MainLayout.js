import React, { useState, useEffect} from 'react';
import OneStoryCard from './OneStoryCard';
import AnswerComment from './AnswerComment';
import style from './styles/MainLayout.module.scss';
import { supabase } from '../../services/supabaseClient';

export default function MainLayout() {

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchRandomStory = async () => {
    try {
      const { data, error } = await supabase.rpc('randomstory');
      if(error) throw error;
      if(data) {
        setStory(data)
        setLoading(false)
        console.log(data);
      }
    } catch(error) {
      alert(error.error_description || error.message)
    }
    console.log(story);
  }

  useEffect(() => {
    fetchRandomStory()
  },[])

  return (
    <div className={style.wrap}>
      {
        story && <OneStoryCard story={story} />
      }
      <AnswerComment story={story} />
    </div>
  )
}

//TODO: rajouter dans le select pour savoir si un user n'a pas déjà comenté un histoire
