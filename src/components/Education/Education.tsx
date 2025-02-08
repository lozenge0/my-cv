// components/Education.tsx
import React from "react";

interface EducationItem {
  school: string;
  degree: string;
  date: string;
  description?: string;
  whatILearnt?: string;
}

const education: EducationItem[] = [
  {
    school: "University of Nottingham",
    degree: "MSci in Computer Science (Hons)",
    date: "2012 - 2017",
    description:
      "I studied a range of modules including AI, Machine Learning, Computer Networks and Software Engineering as part of an undegraduate integrated masters degree.",
    whatILearnt:
      "To be fully independent, being accountable to ones self, to study and revise in a way that suits me best. I was diagnosed with ADHD. Uni friends are friends for life.",
  },
  {
    school: "Hertford Regional College",
    degree: "BTEC Level 3 Extended Diploma in Software Development",
    date: "2010 - 2012",
    description:
      "I studied a range of topics related to computers and computer programming.",
    whatILearnt:
      "To manage my time, to be more responsible for my own work, and that if I put my mind to a problem I can solve ANYTHING with enough commitment",
  },
  {
    school: "John F. Kennedy Catholic School",
    degree: "GCSEs/A-Levels",
    date: "2003 - 2010",
    description:
      "I studied a range of subjects and walked away with 9 GSCEs and 3 A-Levels.",
    whatILearnt:
      "That life is hard but hardship is temporary and makes you stronger.",
  },
];

const Education: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold">{edu.degree}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {edu.school}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{edu.date}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Description: {edu.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Lessons Learnt: {edu.whatILearnt}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Education;
