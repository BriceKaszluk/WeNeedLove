import React from "react";
import { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";
import "tailwindcss/tailwind.css";
import { testimonials } from "../../data/testimonials";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const springs = useSprings(
    testimonials.length,
    testimonials.map((testimonial, i) => ({
      opacity: i === index ? 1 : 0,
      transform: `translateX(${(i - index) * 100}%)`,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
<div className="flex justify-center items-center h-52 bg-transparent mt-8 relative overflow-hidden">
  {springs.map((props, i) => (
    <animated.div
      style={props}
      key={testimonials[i].id}
      className="absolute w-full"
    >
      <div className="mx-auto bg-white rounded-lg shadow-lg p-4">
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
