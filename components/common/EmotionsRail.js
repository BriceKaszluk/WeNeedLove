import React, { useState, useRef, useEffect } from "react";
import styles from './styles/EmotionsRail.module.scss';
import { supabase } from '../../services/supabaseClient';
import { useToasterContext } from '../../contexts/ToasterContext';

const LOGO = {
  clap: '👏',
  love: '😍',
  tada: '🎉',
  thumbUp: '👍',
  unhappy: '🤔'
};

function EmotionRailOld({emotion, comment}) {

  const [showContent, setShowContent] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasterContext();

  useEffect(() => {
    if(emotion) {
      setCurrentEmotion(emotion);
    }
  },[emotion])

  const saveEmotion = async (emotion) => {
    const user = supabase.auth.user();
    try {
      const {data, error} = await supabase.from('comments_emotions').upsert({ 'user_id': user.id, 'comment_id': comment.id , 'emotion_id': emotion });
      setCurrentEmotion(emotion)
      if (error) throw error
    } 
    catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flexbox flexbox-align-center">
      <button
        className={styles.icons_selector_button}
        onClick={() => {setShowContent(!showContent)}}
        // style="width: 34px; height: 34px;"
      >
        {
          currentEmotion ? LOGO[currentEmotion] : 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
  
            // style="vertical-align: middle;"
            preserveAspectRatio="xMidYMid meet"
          >
            <g fill="currentColor">
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 7.58579 14.8358 7.25 15.25 7.25C15.6642 7.25 16 7.58579 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C8.41421 0 8.75 0.335786 8.75 0.75C8.75 1.16421 8.41421 1.5 8 1.5ZM7 7C7 7.55228 6.55228 8 6 8C5.44772 8 5 7.55228 5 7C5 6.44772 5.44772 6 6 6C6.55228 6 7 6.44772 7 7ZM11 7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7ZM8 11.5C9.10457 11.5 10 10.6046 10 9.5H6C6 10.6046 6.89543 11.5 8 11.5ZM12.75 0C13.1642 0 13.5 0.335787 13.5 0.75V2.5H15.25C15.6642 2.5 16 2.83579 16 3.25C16 3.66421 15.6642 4 15.25 4H13.5V5.75C13.5 6.16421 13.1642 6.5 12.75 6.5C12.3358 6.5 12 6.16421 12 5.75V4H10.25C9.885 4 9.5 3.665 9.5 3.25C9.5 2.885 9.885 2.5 10.25 2.5H12V0.75C12 0.335787 12.3358 0 12.75 0Z"
                ></path>
              </g>
            </g>
          </svg>
        }
      </button>
      {
        showContent && 
        <div className={styles.relative}>
          <EmotionRail emotion={currentEmotion} setShowContent={setShowContent} saveEmotion={saveEmotion} />
        </div>
      }
    </div>
  );
}

function EmotionRail({emotion, setShowContent, saveEmotion}) {

  const ref = useRef();

  useEffect(() => {
    function clickOutside(event) {
      if(!ref.current.contains(event.target)) {
        setShowContent(false)
      }
    }
    if(ref) {
      document.addEventListener('mouseup', clickOutside)
      return () => {
        document.removeEventListener('mouseup', clickOutside)
      }
    }
  },[ref])

  return (
    <div ref={ref} className={styles.absolute}>
      {
        Object.keys(LOGO).map((logoName, index) => {
          return (
            <button
            onClick={() => {saveEmotion(logoName)}}
              test={emotion===logoName ? "true" : "false"}
              key={index}
              className={styles.display_emotions}
            >
              <div
                aria-label="emoji"
                className="flexbox flexbox-align-center radius-normal center-text reaction-button__emoji transition"
                // style="width: 24px; height: 24px;"
              >
                <span 
                // style="line-height: 1.2em; display: inline-block; font-size: 18px; text-align: center; word-break: keep-all; width: 24px;"
                >
                  {LOGO[logoName]}
                </span>
              </div>
          </button>
          )
        })
      }
    </div>
  )
}

export default EmotionRailOld;
