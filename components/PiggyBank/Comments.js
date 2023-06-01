import React, { useState, useEffect } from 'react';
import styles from './styles/Comments.module.scss';
import EmotionsRail from '../common/EmotionsRail';
import imgTrash from '../../assets/trash.svg';
import Image from 'next/image';
import { useToasterContext } from '../../contexts/ToasterContext';
import { supabase } from '../../services/supabaseClient';

export default function OneRowStory({comments, lastTimeSeen}) {

  const [showComments, setShowComments] = useState(false);
  const [showNew, setShowNew] = useState(true);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasterContext();

  const handleMouseEnter = () => {
    setShowNew(false);
  };

  const handleMouseLeave = () => {
    setShowNew(true);
  };

  const [hasNewComments, setHasNewComments] = useState(false);
  useEffect(() => {
    if (lastTimeSeen && comments && comments.length > 0) {
      const newComments = comments.find(el => new Date(el.created_at) > lastTimeSeen);
      if (newComments) {
        setHasNewComments(newComments);
      }
    }
  }, [lastTimeSeen, comments])

  const deleteComment = async (commentId) => {
    try{
      const { data, error } = await supabase
      .from('comments')
      .delete()
      .match({ id: commentId })
      if(error) throw error;
      if(data) {
        addToast({
          message: 'Ce commentaire a été supprimé',
          type: 'success',
        });
      } 
    }catch(error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
<div className="space-y-4">
  <button 
    className="flex items-center justify-between w-full py-2 px-4 rounded-lg bg-white shadow-sm text-indigo-600 hover:bg-gray-100 transition-colors duration-300"
    onClick={() => {setShowComments(!showComments)}}
  >
    <span>Comments</span>
    <div className={`arrow_down transform transition-transform duration-300 ${showComments && "rotate-180"}`}>
      
    </div>
  </button>
  <div className={`${showComments ? "block" : "hidden"}`}>
    {
      comments.map(com => (
        <div key={com.id} id={com.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm mb-1">
          <EmotionsRail emotion={com.comments_emotions[0]?.emotion_id} comment={com}/>
          <div className="flex-grow">
            <p className="text-lg text-gray-700 ">{com.text}</p>
          </div>
          <button 
            onClick={() => {
                if (confirm( "Delete this comment?" )) {
                  deleteComment(com.id);
                  document.getElementById(com.id).style.display = 'none';
                }
            }}
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <div className="w-8 h-8">
              <Image
                src={imgTrash}
                alt="icon for delete comment"
                className='object-contain'
              />
            </div>
          </button>
        </div>
      ))
    }
  </div>
</div>

  )
}
