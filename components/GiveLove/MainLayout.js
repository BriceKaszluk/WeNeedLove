import React, { useState, useEffect } from "react";
import OneStoryCard from "./OneStoryCard";
import AnswerComment from "./AnswerComment";
import style from "./styles/MainLayout.module.scss";
import { supabase } from "../../services/supabaseClient";
import { useToasterContext } from "../../contexts/ToasterContext";

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
    <div className={style.wrap}>
      <h1>Partage ta positivité</h1>
      <p className="page_description_text">
      Soutiens les autres membres dans l&apos;aventure qu&apos;est la vie en leur{" "}
        <strong>envoyant un message</strong>💪, prépare le bien car tu ne peux en envoyer{" "}
        <strong>qu&apos;un seul</strong> ! ainsi pas de débat inutile on va à l&apos;essentiel👍, plutôt cool !
      </p>
      <div className={style.input_wrap}>
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
          <div className={style.come_later}>
            <h2>Tu as envoyé beaucoup de positivité, il n&apos;y a plus d&apos;histoire disponible pour le moment... reviens plus tard !</h2>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: rajouter dans le select pour savoir si un user n'a pas déjà comenté un histoire
//TODO: prévoir un bouton pour changer de story
