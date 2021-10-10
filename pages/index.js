import React from 'react';
import Home from '../components/Home/Home';

export default function Homepage({session}) {
  
  return (
    <div>
      <Home session={session} />
    </div>
  )
}
