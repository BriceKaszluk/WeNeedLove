import React, { useState, useEffect } from "react";
import MainLayout from "../components/PiggyBank/MainLayout";
import { supabase } from "../services/supabaseClient";
import { useToasterContext } from "../contexts/ToasterContext";

function PiggyBank() {
  const [stories, setStories] = useState(null);
  const [countedEmotions, setCountedEmotions] = useState(null);
  const [totalCommentsDone, setTotalCommentsDone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastTime, setLastTime] = useState(null);

  const { addToast } = useToasterContext();

  useEffect(() => {
    const fetchAndUpdateLastSeenPiggyBank = async () => {
      try {
        const user = supabase.auth.user();
        const { data, error } = await supabase
          .from("user_connections")
          .select("last_seen_piggy_at")
          .filter("id", "eq", user.id);
        if (error) throw error;
        if (data?.[0]?.last_seen_piggy_at) {
          setLastTime(new Date(data[0].last_seen_piggy_at));
        }

        const { error: errorUpdate } = await supabase
          .from("user_connections")
          .upsert({ id: user.id, last_seen_piggy_at: new Date() });

        if (errorUpdate) throw errorUpdate;
      } catch (error) {
        addToast({
          message: error.error_description || error.message,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAndUpdateLastSeenPiggyBank();
  }, []);

  useEffect(() => {
    const fetchStoriesAnsComments = async () => {
      try {
        const user = supabase.auth.user();
        const { data, error } = await supabase
          .from("stories")
          .select(
            "id, title, text, comments(id, text, created_at, comments_emotions(emotion_id))"
          )
          .filter("user_id", "eq", user.id);
        if (error) throw error;
        if (data) {
          setStories(data);
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
    fetchStoriesAnsComments();
  }, []);

  useEffect(() => {
    const fetchCountedEmotions = async () => {
      try {
        const { data, error } = await supabase.rpc("count_emotions");
        if (error) throw error;
        if (data) {
          const reduced = data.reduce((previous, current) => {
            previous[current.id] = current.total;
            return previous;
          }, {});
          setCountedEmotions(reduced);
        }
      } catch (error) {
        toaster.error("Error", error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountedEmotions();
  }, []);

  useEffect(() => {
    const fetchTotalCommentsDone = async () => {
      try {
        const { data, error } = await supabase.rpc("count_all_comments_done");
        if (error) throw error;
        if (data) {
          setTotalCommentsDone(data);
        }
      } catch (error) {
        toaster.error("Error", error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalCommentsDone();
  }, []);

  return (
    <>
      {!loading && (
        <MainLayout
          stories={stories}
          countedEmotions={countedEmotions}
          totalCommentsDone={totalCommentsDone}
          lastTimeSeen={lastTime}
        />
      )}
    </>
  );
}

export default PiggyBank;
