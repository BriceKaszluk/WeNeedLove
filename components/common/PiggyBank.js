import React from "react";
import Link from "next/link";
import styles from "./styles/PiggyBank.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

function needLove({ counterNotif }) {
  return (
    <>
      <Link legacyBehavior href="/piggy-bank">
        <a title="Mon espace">
          {" "}
          <FontAwesomeIcon
            className="w-11 h-11 m-auto"
            icon={faHeartCirclePlus}
          />
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
