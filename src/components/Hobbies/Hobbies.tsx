// components/Hobbies.tsx
import React from "react";
import HobbyCard from "./HobbyCard";

const hobs: { name: string; description: string; image?: string }[] = [
  {
    name: "Tinkerer",
    description:
      "As a technologist I'm always tinkering with new technologies and building new projects.",
  },
  {
    name: "Traveler",
    description:
      "I love traveling and visiting new places, ask me where I'm heading to next!",
  },
  {
    name: "Music Lover",
    description:
      "There's nothing better than listening to music, live or on excellent speakers.",
  },
  {
    name: "Foodie",
    description:
      "Fine dining is one of my favorite things to do, I love trying new foods and restaurants.",
  },
  {
    name: "Hiker",
    description: "I've hiked two of the three tallest peaks in the UK.",
  },
  {
    name: "Gamer",
    description:
      "Fortnite is my game of choice, there's nothing better than delivering a beat down to 9 year olds.",
  },
];

const Hobbies: React.FC = () => {
  return (
    <section className="mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hobbies & Interests</h2>
      <div className="flex flex-wrap gap-4">
        {hobs.map((hobby, index) => (
          <HobbyCard
            key={index}
            title={hobby.name}
            description={hobby.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
