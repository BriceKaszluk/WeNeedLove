import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeoplePulling } from "@fortawesome/free-solid-svg-icons";

function needLove() {
  return (
    <Link legacyBehavior href="/give-love">
      <a title="Soutenir" className="flex items-center justify-start">
        {" "}
        <FontAwesomeIcon className="w-11 h-11" icon={faPeoplePulling} />
        <span className="md:hidden text-lg ml-2 text-black">Soutenir les membres</span>
      </a>
    </Link>
  );
}

export default needLove;
