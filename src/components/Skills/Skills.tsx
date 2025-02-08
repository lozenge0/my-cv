"use client";
// components/Skills.tsx
import React from "react";
import { motion } from "framer-motion";

const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "NextJS",
  "Auth0",
  "AWS",
  "Docker",
  "SQL",
  "Data Analyitics",
  "NoSQL",
  "Functional Programming",
  "Git",
  "Data Mining",
  "Material Design",
  "GatsbyJS",
  "Computer Networks",
  "AI & Machine Learning",
  "GraphQL",
  "RESTful APIs",
  "CI/CD",
  "Serverless Architecture",
  "Agile",
  "Scrum",
  "Automation",
  "Testing",
  "Atomic Design",
  "GIS",
];

// Define animation variants for the skills
const skillVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1, // Stagger each skill's animation
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

const Skills: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">The Technical Bits</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            custom={idx}
            variants={skillVariants}
            initial="hidden"
            animate="visible"
            className={`px-3 py-1 rounded-full text-sm text-white ${
              idx % 2 === 0 ? "bg-violet-400" : "bg-violet-500"
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
