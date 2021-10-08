import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/Home.module.scss';
import img_need from '../../assets/heart.svg';
import img_give from '../../assets/giveHeart.png';
import img_piggy from '../../assets/piggy-bank.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WeNeedLove</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.logo}>WeNeedLove</h1>
        <span className={styles.main_title}>
          Share your story, send support to community
        </span>
        <span className={styles.main_title_anonymous}>Anonymously</span>

        <div className={`button ${styles.main_button}`}>
          <Link href="/signUp">
            <a className={styles.join_button_text}>Join 5,000 members community now</a>
          </Link>
        </div>
        <div className={styles.icons_grid}>
          <div className={styles.card_wrap}>
            <Image
              src={img_need}
              alt="Picture of heart"
              width={96}
              height={96}
            />
            <h4>share stories</h4>
            <p className={styles.card_text}>tell your story anonymously, the community will support you without prejudice</p>
          </div>
          <div className={styles.card_wrap_middle}>
            <Image
              src={img_give}
              alt="Picture of heart"
              width={96}
              height={96}
            />  
            <h4>support the community</h4>
            <p className={styles.card_text}>support other members in their life adventure by sending them a message</p>        
          </div>
          <div className={styles.card_wrap}>
            <Image
              src={img_piggy}
              alt="Picture of heart"
              width={96}
              height={96}
            />
            <h4>be supported</h4>
            <p className={styles.card_text}>view community comments on your stories and like those who have helped you</p>   
          </div>
        </div>
      </main>
    </div>
  )
}

//TODO: mettre les phrases des carte de la vitrine sur les pages concernées