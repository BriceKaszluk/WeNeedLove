import React from 'react';
import Link from 'next/link';
import styles from './styles/PiggyBank.module.scss';

function needLove() {
  return(
    <Link href="/piggy-bank">
      <a className={`${styles.card} ${styles.my_love}`} title='piggy-bank'></a>
    </Link>
  ) 
}

export default needLove