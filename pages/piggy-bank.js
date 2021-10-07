import React, { useState, useEffect} from 'react';
import MainLayout from '../components/PiggyBank/MainLayout';
import { supabase } from '../services/supabaseClient';
import toaster from '../services/toaster';

function PiggyBank() {

  const [stories, setStories] = useState(null);
  const [countedEmotions, setCountedEmotions] = useState(null);
  const [totalCommentsDone, setTotalCommentsDone] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStoriesAnsComments = async () => {
      try {
        const user = supabase.auth.user();
        const {data, error} = await supabase.from('stories').select('id, title, text, comments(id, text, comments_emotions(emotion_id))').filter('user_id', 'eq', user.id);
        if(error) throw error;
        if(data) {
          setStories(data);
        }
      } catch(error) {
        toaster.error('Error', error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStoriesAnsComments();
  },[])

  useEffect(() => {
    const fetchCountedEmotions = async () => {
      try{
        const { data, error } = await supabase.rpc('count_emotions');
        if(error) throw error;
        if(data) {
          const reduced = data.reduce((previous, current) => {
            previous[current.id] = current.total  
            return previous
          },{})
          setCountedEmotions(reduced);
        }
      } catch(error) {
        toaster.error('Error', error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountedEmotions();
  },[])

  useEffect(() => {
    const fetchTotalCommentsDone = async () => {
      try{
        const { data, error } = await supabase.rpc('count_all_comments_done');
        if(error) throw error;
        if(data) {
          console.log(data, 'les com total')
          setTotalCommentsDone(data);
        }
      } catch(error) {
        toaster.error('Error', error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTotalCommentsDone();
  },[])

  return(
    <>
    {
      !loading && <MainLayout stories={stories} countedEmotions={countedEmotions} totalCommentsDone={totalCommentsDone} />
    }
    </>
  ) 
}

export default PiggyBank