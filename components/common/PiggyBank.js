import React from 'react';
import Link from 'next/link';
import styles from './styles/PiggyBank.module.scss';

function needLove({ counterNotif }) {
  return(
    <>
      <Link href="/piggy-bank">
        <a className={`button_image icon_piggy_bank`} title='piggy-bank'></a>
      </Link>
      { counterNotif > 0 &&
        <div className={styles.counter_notif_holder}>
          <div className={styles.counter_notif}>
            { counterNotif }
          </div>
        </div>
      }
    </>
  ) 
}

export default needLove