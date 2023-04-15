import React from 'react';
import Link from 'next/link';

function needLove() {
  return(
    <Link href="/give-love">
      <a className={`button_image icon_give_love`} title='give love'></a>
    </Link>
  ) 
}

export default needLove