import React from 'react';
import styles from './styles/TotalCommentsDone.module.scss';

export default function TotalCommentsDone({totalCommentsDone}) {
  return (
    <div className={`flex_column_centered ${styles.wrap}`}>
      <h2>Comments sent</h2>
      <span className={styles.number}>{totalCommentsDone}</span>
    </div>
  )
}
