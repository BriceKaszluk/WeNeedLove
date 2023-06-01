import React from "react";
import styles from "./styles/TotalCommentsDone.module.scss";
import Link from "next/link";

export default function TotalCommentsDone({ totalCommentsDone }) {
  return (
<div className="flex flex-col items-center justify-center space-y-4 text-center">
  <h3 className="text-xl font-bold text-indigo-600">Commentaires envoyés</h3>
  <span className="text-4xl font-bold text-indigo-600">{totalCommentsDone || 0}</span>
  <Link legacyBehavior href="/give-love">
    <a className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300">
      Envoyer du soutien
    </a>
  </Link>
</div>

  );
}
