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
      <main className="order-2 md:order-1 w-full md:w-2/3 p-4 md:mt-4 flex flex-col justify-around">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-4">
          <div className="flex flex-col items-center text-center bg-black bg-opacity-50 p-4 rounded-lg shadow-md">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faComments}
            />
            <h4 className="font-bold my-4 text-xl text-white">Exprime-toi librement</h4>
            <p className="text-white">
              Ici, ton histoire est précieuse. Partage-la en toute confiance,
              c&apos;est totalement anonyme. L&apos;expression est un pas vers
              la guérison, n&apos;hésite pas.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-black bg-opacity-50 p-4 rounded-lg shadow-md">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faPeoplePulling}
            />
            <h4 className="font-bold my-4 text-xl text-white">Offre ton soutien </h4>
            <p className="text-white">
              Parfois, un simple message de soutien peut illuminer la journée de
              quelqu&apos;un. Si une histoire te touche, laisse une note
              d&apos;encouragement. Un geste de gentillesse peut avoir un impact
              incroyable.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-black bg-opacity-50 p-4 rounded-lg shadow-md">
            <FontAwesomeIcon
              className="w-24 h-24 m-auto text-indigo-600"
              icon={faHeartCirclePlus}
            />
            <h4 className="font-bold my-4 text-xl text-white">
              Sens l&apos;effet de la communauté{" "}
            </h4>
            <p className="text-white">
              Ne te sens jamais seul. Consulte et reçois les commentaires que
              les autres membres ont laissés pour toi. Tu es précieux pour nous,
              laisse la communauté t&apos;apporter son soutien.
            </p>
          </div>
        </div>

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
            partage et de soutien dès aujourd&apos;hui. N&apos;attends plus, ta
            voix compte ici !
          </p>
        </div>
        <div className="w-full max-w-sm mx-auto">{getAuthComponent()}</div>
      </div>
    </div>
  );
}
