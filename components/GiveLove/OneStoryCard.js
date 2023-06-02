import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

export default function OneStoryCard({ story, fetchRandomStory }) {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg mb-8 border-2">
      <div className="flex justify-between items-start w-full">
        <h3 className="text-xl font-bold text-indigo-600 mb-2">
          {story.title}
        </h3>
        <button
          className=" w-8 h-8 flex justify-center items-center p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors duration-300"
          onClick={() => fetchRandomStory()}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>

      <p className="text-lg text-gray-700 mb-2">{story.text}</p>
    </div>
  );
}
