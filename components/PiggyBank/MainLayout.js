import React from 'react';
import OneStory from './OneStory';
import Comments from './Comments';
import MyEmotionsCounter from '../common/MyEmotionsCounter';
import TotalCommentsDone from '../common/TotalCommentsDone';
import Link from "next/link";
import styles from './styles/MainLayout.module.scss';

export default function MainLayout({stories, countedEmotions, totalCommentsDone, lastTimeSeen}) {

  return (
<div className="container mx-auto p-4 md:p-8 max-w-screen-lg bg-white rounded-lg shadow-md my-8">
  <h1 className="text-3xl font-bold text-indigo-600 mb-4">Ton espace</h1>
  <p className="text-lg text-gray-700 mb-6">
    Consulte les <strong>commentaires envoyés par les membres</strong> et réagis à <strong>ceux qui t&apos;ont aidé</strong>😍. 
    D&apos;autres fonctionnalités sont en cours de développement, <strong>un peu de patience</strong>!😊
  </p>
  <div className="flex flex-col md:flex-row justify-between items-center md:mb-8">
     <TotalCommentsDone totalCommentsDone={totalCommentsDone}  />
     <div className='my-6'><MyEmotionsCounter countedEmotions={countedEmotions} /></div>
    
  </div>
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold text-indigo-600">Tes histoires partagées</h2>
    <Link legacyBehavior href="/need-love">
      <a className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300">Partager une histoire</a>
    </Link>
  </div>
  {stories && stories.length === 0 ? (
    <div className="flex flex-col items-center text-center">
      <span className="text-lg text-gray-700 mb-4">Tu n&apos;a pas encore partagé d&apos;histoire pour le moment</span>
      <Link legacyBehavior href='/need-love'>
        <a className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300">
          J&apos;aimerais partager
        </a>
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-8">
      {stories && stories.map(story => (
        <div key={story.id}>
          <OneStory story={story} />
          <Comments comments={story.comments} lastTimeSeen={lastTimeSeen}/>
        </div>
      ))}
    </div>
  )}
</div>

  )
}
