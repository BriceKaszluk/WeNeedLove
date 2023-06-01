import React from 'react';
import styles from './styles/AnswerComment.module.scss';

export default function AnswerComment({story, userAnswer, setUserAnswer, handleSubmit}) {

  return (
<form className="flex flex-col" onSubmit={handleSubmit}>
  <textarea 
    autoFocus
    className="p-2 bg-white rounded-lg shadow-sm resize-none mb-4 text-gray-700" 
    name="myInput" 
    placeholder="Soutiens ce membre en lui envoyant un message" 
    cols="100" 
    rows="10" 
    required
    value={userAnswer}
    onChange={(e) => {
      setUserAnswer(e.target.value);
    }}
  />
  <button 
    className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
    type="submit" 
    name="submitUserAnswer"
  >
    <span>Envoyer mon soutien</span>
  </button>
</form>



  )
}
