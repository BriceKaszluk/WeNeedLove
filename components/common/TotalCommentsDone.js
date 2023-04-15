import React from 'react';
import styles from './styles/TotalCommentsDone.module.scss';
import Link from 'next/link'

export default function TotalCommentsDone({totalCommentsDone}) {
  return (
    <div className={styles.wrap}>
      <h3>Commentaires envoyés</h3>
      <span className={styles.number}>{totalCommentsDone || 0}</span>
      <Link href="/give-love">
        <a className={`button ${styles.button_give}`}>Envoyer du soutien</a>
      </Link>
    </div>
  )
}
