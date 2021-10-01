import React, { useState, useEffect} from 'react';
import MainLayout from '../components/PiggyBank/MainLayout';
import { supabase } from '../services/supabaseClient';

function PiggyBank() {

  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStoriesAnsComments = async () => {
      try {
        const {data, error} = await supabase.from('stories').select('id, title, text, comments(id, text)')
        if(error) throw error;
        if(data) {
          setStories(data)
          setLoading(false)
          console.log(data);
        }
      } catch(error) {
        alert(error.error_description || error.message)
      }
    }
    fetchStoriesAnsComments();
  },[])

  return(
    <MainLayout stories={stories} />
  ) 
}

export default PiggyBank