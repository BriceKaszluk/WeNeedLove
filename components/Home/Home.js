import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPeoplePulling } from "@fortawesome/free-solid-svg-icons";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import TestimonialsMobile from "../common/TestimonialsMobile";
import Testimonials from "../common/Testimonials";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { auth } = router.query;

  const getAuthComponent = () => {
    switch (auth) {
      case "signin":
        return <SignIn />;
      case "signup":
        return <SignUp />;
      case "resetPassword":
        return <ResetPassword />;
      default:
        return <SignIn />;
    }
  };
  return (
    <div className="container mx-auto md:px-4 flex flex-col md:flex-row md:h-[100vh]">
      <main className="order-2 md:order-1 w-full md:w-2/3 p-4 md:mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faComments}
            />
            <h4 className="font-bold mt-4">Partage ton histoire</h4>
            <p>C'est anonyme, tu peux t'exprimer en toute confiance</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faPeoplePulling}
            />
            <h4 className="font-bold mt-4">Soutien la communauté</h4>
            <p>
              Envoie un message de soutien lorsqu'une histoire te touche, on en
              a tous besoin un jour
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faHeartCirclePlus}
            />
            <h4 className="font-bold mt-4">Reçois du soutien</h4>
            <p>
              Consulte les commentaires que les autres membres t'ont envoyés
            </p>
          </div>
        </div>
        <div
          className="h-96 md:h-[420px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/main_background.jpg')" }}
        ></div>
        <div className="lg:hidden">
          <TestimonialsMobile />
        </div>
        <div className="hidden lg:block">
          <Testimonials />
        </div>
      </main>
      <div className="order-1 md:order-2 w-full md:w-1/3 p-4 bg-gray-100 flex flex-col items-center justify-between border-l md:border-t-0 border-gray-200 shadow-md mt-4 md:mt-0">
  <div className="md:pt-16">
    <h1 className="text-2xl lg:text-5xl font-bold text-indigo-600">
      WeNeedLove
    </h1>
  </div>
  <div className="flex flex-col items-center">
    {getAuthComponent()}
    <div className="flex justify-center px-2.5 my-4">
      <p className="text-2xl font-bold text-center text-indigo-600">
        Rejoins la communauté <br></br> et partage ton histoire aujourd'hui !
      </p>
    </div>
  </div>
  <div></div>
</div>

    </div>
  );
}
