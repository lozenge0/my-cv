// components/Profile.tsx
import React from "react";
import Image from "next/image";
import meImage from "../../assets/me.jpeg";

const Profile: React.FC = () => {
  return (
    <section className="flex items-center mb-8">
      <Image
        src={meImage}
        alt="Lawrence Reed Profile Picture"
        width={96} // width in pixels
        height={96} // height in pixels
        className="rounded-full mr-4"
      />
      <div>
        <h1 className="text-3xl font-bold">Lawrence Reed MSci (hons)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          In beer we trust
        </p>
        <a
          href="/LawrenceReedsCV.pdf"
          download="LawrenceReed_CV.pdf"
          className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
        >
          📄 Download as a pdf
        </a>
      </div>
    </section>
  );
};

export default Profile;
