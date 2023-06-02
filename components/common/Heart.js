import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function needLove() {
  return (
    <Link legacyBehavior href="/need-love">
      <a  title="Partager" className="flex items-center justify-start">
        {" "}
        <FontAwesomeIcon className="w-11 h-11" icon={faComments} />
        <span className="md:hidden text-lg ml-2 text-black">Partager une histoire</span>
      </a>
    </Link>
  );
}

export default needLove;
