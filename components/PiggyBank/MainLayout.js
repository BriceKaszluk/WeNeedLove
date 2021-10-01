import React, { useState, useEffect} from 'react';
import style from './styles/MainLayout.module.scss';

export default function MainLayout({stories}) {

  return (
    <div>
      {
        stories && stories.map(story => {
          return (
            <div key={story.id}>
              <h2>{story.title}</h2>
              <p>{story.text}</p>
              <div>
                <h3>Comments</h3>
                {
                  story.comments.map(com => {
                    return (
                      <div key={com.id}>
                        <p>{com.text}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          )
        })
      }
    </div>
  )
}
