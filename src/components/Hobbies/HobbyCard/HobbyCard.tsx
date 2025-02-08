import React from "react";
// import Image from "next/image";

interface HobbyCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

const HobbyCard: React.FC<HobbyCardProps> = ({
  title,
  description,
  // imageUrl,
}) => {
  return (
    <div className="group w-64 h-64" style={{ perspective: "1000px" }}>
      <div
        className="flip-card-inner relative w-full h-full transition-transform duration-700 transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white border rounded-lg shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-xl font-bold  dark:text-gray-600">{title}</h3>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 border rounded-lg shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-base p-4  dark:text-gray-600">{description}</p>
          {/* <Image
            src={imageUrl || "/default-image.jpg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          ) : (<p className="text-base p-4">{description}</p>) */}
        </div>
      </div>
    </div>
  );
};

export default HobbyCard;
