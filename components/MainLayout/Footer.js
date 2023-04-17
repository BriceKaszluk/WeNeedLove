import React from 'react';
import styles from './styles/Footer.module.scss';

export default function Footer() {
  return(
    <footer className="flex_column_centered">
      <a className={styles.contact_link} href="mailto:webvista.developpeur@gmail.com">weneedlove.contact@gmail.com</a>
    </footer>
  )
}
