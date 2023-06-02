import React from "react";
import StoryInput from "./StoryInput";
import style from "./styles/MainLayout.module.scss";
import InfoTooltip from "../common/InfoTooltip";

export default function MainLayout() {
  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-4 md:p-8 max-w-screen-lg bg-white rounded-lg shadow-md">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-3xl font-bold text-indigo-600">
              Mes histoires
            </h1>
            <InfoTooltip classname="absolute">
              <span>Ici, vous pouvez partager votre histoire. Écrire peut être une formidable forme de catharsis. N'oubliez pas, votre histoire sera anonyme. Vous pouvez partager n'importe quelle difficulté ou problème de vie que vous rencontrez. La communauté est là pour vous offrir du soutien. N'hésitez pas à partager</span>
            </InfoTooltip>
          </div>
          <span className="italic">anonymes</span>
        </div>
        <StoryInput />
      </div>
    </div>
  );
}
