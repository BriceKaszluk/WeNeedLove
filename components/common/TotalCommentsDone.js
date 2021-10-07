import React from 'react';
import styles from './styles/TotalCommentsDone.module.scss';

export default function TotalCommentsDone({totalCommentsDone}) {
  return (
    <div className={styles.wrap}>
      <h3>Comments sent</h3>
      <span className={styles.number}>{totalCommentsDone}</span>
    </div>
  )
}
