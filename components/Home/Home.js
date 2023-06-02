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
            <h4 className="font-bold mt-4">Exprime-toi librement</h4>
            <p>
              Ici, ton histoire est précieuse. Partage-la en toute confiance,
              c'est totalement anonyme. L'expression est un pas vers la
              guérison, n'hésite pas.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faPeoplePulling}
            />
            <h4 className="font-bold mt-4">Offre ton soutien </h4>
            <p>
              Parfois, un simple message de soutien peut illuminer la journée de
              quelqu'un. Si une histoire te touche, laisse une note
              d'encouragement. Un geste de gentillesse peut avoir un impact
              incroyable.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faHeartCirclePlus}
            />
            <h4 className="font-bold mt-4">Sens l'effet de la communauté </h4>
            <p>
              Ne te sens jamais seul. Consulte et reçois les commentaires que
              les autres membres ont laissés pour toi. Tu es précieux pour nous,
              laisse la communauté t'apporter son soutien.
            </p>
          </div>
        </div>
        <div
          className="h-96 md:h-[390px] w-full bg-cover hidden md:block"
          style={{
            backgroundImage: "url('/main_background.jpg')",
            backgroundPosition: "center 48%",
          }}
        ></div>
        <div
          className="h-96 md:h-[390px] w-full bg-cover md:hidden"
          style={{ backgroundImage: "url('/main_background.jpg')" }}
        ></div>

        <div className="lg:hidden">
          <TestimonialsMobile />
        </div>
        <div className="hidden lg:block">
          <Testimonials />
        </div>
      </main>
      <div className="order-1 md:order-2 w-full md:w-1/3 p-4 bg-gray-100 flex flex-col items-center justify-evenly border-l md:border-t-0 border-gray-200 shadow-md mt-4 md:mt-0">
        <h1 className="text-3xl lg:text-5xl font-bold text-indigo-600 mb-2 md:mb-2">
          WeNeedLove
        </h1>
        <div className="w-full px-2.5 my-2">
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-indigo-600 text-center mb-4">
            Fais partie du changement dès maintenant !
          </p>
          <p className="text-md md:text-lg lg:text-xl text-gray-700 text-center mb-4 md:mb-0">
            Rejoins notre communauté bienveillante et commence ton voyage de
            partage et de soutien dès aujourd'hui. N'attends plus, ta voix
            compte ici !
          </p>
        </div>
        <div className="w-full max-w-sm mx-auto">{getAuthComponent()}</div>
      </div>
    </div>
  );
}
