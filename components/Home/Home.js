import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/Home.module.scss";
import img_need from "../../assets/sad.png";
import img_give from "../../assets/giveHeart.png";
import img_piggy from "../../assets/piggy-bank.png";

export default function Home({ session }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WeNeedLove</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="WeNeedLove" />
        <meta
          property="og:description"
          content="Share your story and give love to the world!"
        />
        <meta property="og:image" content="../../assets/giveHeart.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.logo}>WeNeedLove</h1>
        <span className={styles.main_title}>
        Partage ton histoire et laisse la communauté te soutenir.
        </span>
        <span className={styles.main_title_anonymous}>ici pas de jugement c&apos;est anonyme !</span>
        {!session && (
          <div className={`button ${styles.main_button}`}>
            <Link href="/signUp">
              <a className={styles.join_button_text}>
                Rejoins la communauté !
              </a>
            </Link>
          </div>
        )}
        {session && (
          <div className={`button ${styles.main_button}`}>
            <Link href="/piggy-bank">
              <a className={styles.join_button_text}>Access my dashboard</a>
            </Link>
          </div>
        )}
        <div className={styles.icons_grid}>
          <Link href="/need-love">
            <a className={styles.card_wrap}>
              <Image
                src={img_need}
                alt="Picture of heart"
                width={96}
                height={96}
              />
              <h4>Partage ton histoire</h4>
              <p className={styles.card_text}>
              C&apos;est anonyme, la communauté te soutiendra
              avec bienveillance
              </p>
            </a>
          </Link>
          <Link href="/give-love">
            <a className={styles.card_wrap_middle}>
              <Image
                src={img_give}
                alt="Picture of heart"
                width={96}
                height={96}
              />
              <h4>Soutien la communauté</h4>
              <p className={styles.card_text}>
              Envoie un message de soutien lorsqu&apos;une histoire te touche, on en a tous besoin un jour
              </p>
            </a>
          </Link>
          <Link href="/piggy-bank">
            <a className={styles.card_wrap}>
              <Image
                src={img_piggy}
                alt="Picture of heart"
                width={96}
                height={96}
              />
              <h4>Reçois du soutien</h4>
              <p className={styles.card_text}>
              Consulte les commentaires que les autres membres t&apos;ont envoyés
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

//TODO: mettre les phrases des carte de la vitrine sur les pages concernées
