import React from 'react';
import OneStoryCard from './OneStoryCard';
import AnswerComment from './AnswerComment';
import style from './styles/MainLayout.module.scss';

export default function MainLayout() {

  const fakeStory = {
    title: 'My problem',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra mi eu rutrum aliquet. Donec non suscipit turpis. Maecenas elit justo, rutrum et metus non, ullamcorper volutpat mauris. Cras nec rhoncus mi. Vivamus vitae nunc purus. Aliquam suscipit, odio nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra mi eu rutrum aliquet. Donec non suscipit turpis. Maecenas elit justo, rutrum et metus non, ullamcorper volutpat mauris. Cras nec rhoncus mi. Vivamus vitae nunc purus. Aliquam suscipit, odio nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra mi eu rutrum aliquet. Donec non suscipit turpis. Maecenas elit justo, rutrum et metus non, ullamcorper volu.',
    image: 'https://cdn.pixabay.com/photo/2021/02/15/08/31/woman-6017024_960_720.jpg'
  };

  return (
    <div className={style.wrap}>
      <OneStoryCard story={fakeStory} />
      <AnswerComment />
    </div>
  )
}
