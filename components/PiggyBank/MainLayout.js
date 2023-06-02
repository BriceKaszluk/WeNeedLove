import React from "react";
import OneStory from "./OneStory";
import Comments from "./Comments";
import MyEmotionsCounter from "../common/MyEmotionsCounter";
import TotalCommentsDone from "../common/TotalCommentsDone";
import Link from "next/link";
import InfoTooltip from "../common/InfoTooltip";

export default function MainLayout({
  stories,
  countedEmotions,
  totalCommentsDone,
  lastTimeSeen,
}) {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-screen-lg bg-white rounded-lg shadow-md my-8">
      <div className="flex items-start justify-center w-full mb-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Mon espace</h1>
        <InfoTooltip classname="absolute">
          <span>C'est votre espace personnel. Ici, vous pouvez consulter le nombre de commentaires que vous avez envoyés, les réactions que vos commentaires ont suscitées et les commentaires que vous avez reçus sur vos histoires. C'est un excellent moyen de suivre votre engagement avec la communauté et l'impact positif que vous y apportez.</span>
        </InfoTooltip>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-start items-center md:mb-8">
        <TotalCommentsDone totalCommentsDone={totalCommentsDone} />
        {stories && stories.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-indigo-600 text-center mb-4">
              Tes histoires partagées
            </h2>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <span className="text-4xl font-bold text-indigo-600">0</span>
            </div>
            <Link legacyBehavior href="/need-love">
              <a className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 mt-4">
                Partager une histoire
              </a>
            </Link>
          </div>
        ) : null}
        <MyEmotionsCounter countedEmotions={countedEmotions} />
      </div>
      <div className="flex justify-center md:justify-between items-center mb-4">
        {stories && stories.length === 0 ? null : (
          <div className="flex flex-col md:flex-row justify-between w-full items-center">
            <h2 className="text-xl font-bold text-indigo-600 text-center">
              Tes histoires partagées
            </h2>
            <Link legacyBehavior href="/need-love">
              <a className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 my-4">
                Partager une histoire
              </a>
            </Link>
          </div>
        )}
      </div>
      {stories && stories.length === 0 ? null : (
        <div className="grid grid-cols-1 gap-8">
          {stories &&
            stories.map((story) => (
              <div key={story.id} className="border-2 p-2 shadow-md rounded-md">
                <OneStory story={story} />
                <Comments
                  comments={story.comments}
                  lastTimeSeen={lastTimeSeen}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
