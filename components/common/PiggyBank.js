import React from "react";
import Link from "next/link";
import styles from "./styles/PiggyBank.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

function needLove({ counterNotif }) {
  return (
    <>
      <Link legacyBehavior href="/piggy-bank">
        <a title="Mon espace" className="flex items-center justify-start">
          {" "}
          <FontAwesomeIcon
            className="w-11 h-11"
            icon={faHeartCirclePlus}
          />
          <span className="md:hidden text-lg ml-2 text-black">Mon espace</span>
        </a>
      </Link>
      {counterNotif > 0 && (
        <div className={styles.counter_notif_holder}>
          <div className={styles.counter_notif}>{counterNotif}</div>
        </div>
      )}
    </>
  );
}

export default needLove;
