import React from "react";
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

interface ExperienceProps {
  company: string;
  role: string;
  date: string;
  description: string;
}

const Experience: React.FC<ExperienceProps> = ({
  company,
  role,
  date,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starting state (invisible and slightly shifted down)
      animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
      transition={{ duration: 0.6, ease: "easeOut" }} // Transition settings
      style={{
        // background: "#fff",
        borderRadius: "8px",
        // padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
      variants={containerVariants}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          {role} @ {company}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Experience;
