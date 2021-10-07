import React, { useState, useEffect} from 'react';
import styles from './styles/MyEmotionsCounter.module.scss';

export default function MyEmotionsCounter({countedEmotions}) {

  const LOGO = {
    clap: '👏',
    love: '😍',
    tada: '🎉',
    thumbUp: '👍',
    unhappy: '🤔'
  };

  return (
    <div>
      <div className={styles.wrap}>
      <h3>feedback on your comments</h3>
        <div className="flex_centered">
          {
            Object.keys(LOGO).map((logoName, index) => {
              return (
                <div
                  key={index}
                  className={styles.display_emotions}
                >
                  <div
                    aria-label="emoji"
                    className="flex_column_centered"
                  >
                    <span
                    >
                      {LOGO[logoName]}
                    </span>
                    {
                      countedEmotions && (
                        <span className={styles.number}>{countedEmotions[logoName] || 0}</span>
                      )
                    }
                  </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

//TODO:mettre la constante logo dans un fichier séparé