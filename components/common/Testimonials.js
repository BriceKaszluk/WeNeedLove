import React from "react";
import { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";
import "tailwindcss/tailwind.css";
import { testimonials } from "../../data/testimonials";

function Testimonials() {
  const [indexes, setIndexes] = useState([0, 1, 2]); // On initialise l'état pour afficher les trois premiers témoignages
  const springs = useSprings(
    testimonials.length,
    testimonials.map((testimonial, i) => ({
      opacity: indexes.includes(i) ? 1 : 0,
      transform: `translateX(${(i - indexes[0]) * 100}%)`,
      config: { tension: 220, friction: 120 }, // Ajout d'une configuration pour l'animation
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes((prevIndexes) => {
        let nextIndexes = [
          (prevIndexes[0] + 1) % testimonials.length,
          (prevIndexes[1] + 1) % testimonials.length,
          (prevIndexes[2] + 1) % testimonials.length,
        ];
        if (nextIndexes[2] === testimonials.length - 1) {
          nextIndexes = [0, 1, 2];
        }
        return nextIndexes;
      });
    }, 5000); // Changement de l'intervalle à 2000ms pour une transition plus lente
    return () => clearInterval(interval);
  }, []);



  return (
<div className="flex justify-evenly items-center h-48 bg-transparent-100 mt-10 relative overflow-hidden">
  {springs.map((props, i) => (
    <animated.div
      style={props}
      key={testimonials[i].id}
      className="absolute left-0 w-80"
    >
      <div className="mx-auto bg-white rounded-lg shadow-lg p-4 h-48 ml-4">
        <div className="text-2xl font-bold">
          {testimonials[i].name}
        </div>
        <div className="italic text-base mt-2">
          "{testimonials[i].text}"
        </div>
      </div>
    </animated.div>
  ))}
</div>

  );
}

export default Testimonials;


