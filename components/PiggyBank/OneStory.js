import React from 'react';
import styles from './styles/OneStory.module.scss';
import truncate from '../../services/truncateString';

export default function StoriesRows({story}) {

  return (
<div className="space-y-2">
  <h2 className="text-xl font-bold text-indigo-600">{truncate(story.title, 10)}</h2>
  <p className="text-lg text-gray-700">{truncate(story.text, 150)}...</p>
</div>

  )
}
