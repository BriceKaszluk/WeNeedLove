import React from 'react';
import styles from './styles/OneStory.module.scss';
import truncate from '../../services/truncateString';

export default function StoriesRows({story}) {

  return (
    <>
      <h2 className="story_title">{truncate(story.title, 10)}</h2>
      <p className="story_text">{truncate(story.text, 150)}...</p>
    </>
  )
}
