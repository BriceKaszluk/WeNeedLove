import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeoplePulling } from "@fortawesome/free-solid-svg-icons";

function needLove() {
  return(
    <Link href="/give-love">
      <a className={`button_image icon_comments`} title='give love'>                <FontAwesomeIcon
                  className="w-11 h-11 m-auto"
                  icon={faPeoplePulling}
                /></a>
    </Link>
  ) 
}

export default needLove