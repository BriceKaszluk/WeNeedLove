import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function needLove() {
  return(
    <Link href="/need-love">
      <a className={`button_image icon_comments`} title='Need love'>              <FontAwesomeIcon
                  className="w-11 h-11 m-auto"
                  icon={faComments}
                /></a>
    </Link>
  ) 
}

export default needLove