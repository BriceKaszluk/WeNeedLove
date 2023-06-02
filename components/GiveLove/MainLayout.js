import React, { useState, useEffect } from "react";
import OneStoryCard from "./OneStoryCard";
import AnswerComment from "./AnswerComment";
import style from "./styles/MainLayout.module.scss";
import { supabase } from "../../services/supabaseClient";
import { useToasterContext } from "../../contexts/ToasterContext";
import InfoTooltip from "../common/InfoTooltip";

export default function MainLayout() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");

  const { addToast } = useToasterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("comments")
        .insert([{ text: userAnswer, user_id: user.id, story_id: story.id }]);
      if (data) {
        setUserAnswer("");
        addToast({
          message: "Ton message a été envoyé, merci pour ton soutien !",
          type: "success",
        });
        fetchRandomStory();
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: "error",
      });
    }
  };

  const fetchRandomStory = async () => {
    try {
      const { data, error } = await supabase.rpc("randomstory");
      if (error) {
        throw error;
      }
      if (data && data.id !== null) {
        setStory(data);
      } else {
        setStory(null);
      }
    } catch (error) {
      addToast({
        message: error.error_description || error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomStory();
  }, []);

  return (
    <div className="flex items-center justify-center h-full my-8 max-w-full">
      <div className="container mx-auto p-4 md:p-8 max-w-screen-lg bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-center w-full mb-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Soutenir</h1>
        <InfoTooltip classname="absolute">
          <span>Dans cette section, vous pouvez lire les histoires des autres membres de manière aléatoire. Si vous vous sentez inspiré, n'hésitez pas à leur envoyer un commentaire de soutien. Si une histoire ne résonne pas avec vous, pas de souci, vous pouvez passer à la suivante. Rappelez-vous, un simple mot d'encouragement peut faire toute la différence pour quelqu'un</span>
        </InfoTooltip>
      </div>
        {!loading && story && (
          <>
            <OneStoryCard story={story} fetchRandomStory={fetchRandomStory} />
            <AnswerComment
              story={story}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              handleSubmit={handleSubmit}
            />
          </>
        )}
        {!story && !loading && (
          <div className="mt-4">
            <h2>
              Tu as envoyé beaucoup de positivité, il n&apos;y a plus
              d&apos;histoire disponible pour le moment... reviens plus tard !
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: rajouter dans le select pour savoir si un user n'a pas déjà comenté un histoire
//TODO: prévoir un bouton pour changer de story
