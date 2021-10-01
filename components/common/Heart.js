import React from 'react';
import Link from 'next/link';
import styles from './styles/Heart.module.scss';

function needLove() {
  return(
    <Link href="/need-love">
      <a className={`${styles.card} ${styles.need_love}`} title='Need love'></a>
    </Link>
  ) 
}

export default needLove