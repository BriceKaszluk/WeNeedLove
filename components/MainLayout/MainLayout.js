import React from "react";
import styles from "./styles/MainLayout.module.scss";
import CookieBanner from "../common/CookieBanner";

export default function MainLayout({ children, session }) {

  return (
    <div className={`${styles.wrap} bg-[url('/weneedlove-background.png')] bg-cover flex flex-col justify-center items-center`}>
      <CookieBanner />
      {children}
    </div>
  );
}
