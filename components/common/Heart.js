import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function needLove() {
  return (
    <Link legacyBehavior href="/need-love">
      <a  title="Partager">
        {" "}
        <FontAwesomeIcon className="w-11 h-11 m-auto" icon={faComments} />
      </a>
    </Link>
  );
}

export default needLove;
