"use client";
import React from "react";
import Experience from "./Experiece";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.3,
    },
  },
};

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Turing Intelligence Technology Services",
    role: "Founder, Head of Technology, Finance & Consulting",
    date: "April 2023 - Present",
    description:
      "Creator of things that go in the browser, Chief idea dude, head of fun, all round good bean.",
  },
  {
    company: "re:sustain",
    role: "Contract Frontend Technology Lead && Chief Pixel Pusher",
    date: "April 2023 - Present",
    description:
      "A short project to build a proof of concept web dashboard that became a much larger contract with multiple deliverables. I maintain 3 UI’s; Marketing Site (GatsbyJS), Portal (NextJS), Project THOR (NextJS).",
  },
  {
    company: "NHS England/NHS Digital",
    role: "Contract Digital Developer",
    date: "August 2022 - March 2023",
    description:
      "I came onboard as a subject matter expert to help guide a React project to migrate from a legacy system.",
  },
  {
    company: "Reason",
    role: "Senior Software Engineer",
    date: "February 2022 - August 2022",
    description:
      "One of the coolest jobs I’ve ever had, I worked at a digital agency working for Levi’s to add new features to a successful project and migrate it to Levi’s infrastructure.",
  },
  {
    company: "EDF",
    role: "DevOps Engineer",
    date: "August 2020 - February 2022",
    description:
      "At EDF I worked in their new in-house tech team to deliver digital transformation projects and tools.",
  },
  {
    company: "WatchKeeper International",
    role: "Full Stack Engineer",
    date: "January 2020 - July 2020",
    description:
      "A small startup that built a GIS (Geographic Information System) platform that identified risks to company assets, I integrated new data API’s and built new features.",
  },
  {
    company: "Anglo American",
    role: "React Engineer",
    date: "June 2019 - November 2019",
    description:
      "Part of an internal innovation team that would develop cutting edge web applications for different aspects of the mining industry",
  },
  {
    company: "MRX Technologies A Siemens Business",
    role: "Python Software Tester",
    date: "December 2018 - June 2019",
    description:
      "As a Python tester I helped test high precision measuing equipment for the rail and mining industry.",
  },
  {
    company: "Wipro Technologies @Lloyds Banking Group",
    role: "Graduate Software Engineer",
    date: "September 2017 - November 2018",
    description:
      "After graduation I picked up a job as a digital consultant for Wipro Technologies and went to work for their main UK client Lloyds Banking Group, where I was embedded in the mobile development team.",
  },
];

const Experiences: React.FC = () => {
  return (
    <section className="mb-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {experiences.map((exp, index) => (
          <Experience
            key={index}
            company={exp.company}
            role={exp.role}
            date={exp.date}
            description={exp.description}
          />
        ))}
      </motion.div>

      {/* {experiences.map((exp, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold">
            {exp.role} @ {exp.company}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{exp.date}</p>
          <p>{exp.description}</p>
        </div>
      ))} */}
    </section>
  );
};

export default Experiences;
