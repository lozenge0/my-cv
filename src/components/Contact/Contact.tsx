// components/Contact.tsx
import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <ul>
        {/* <li>
          Email:{" "}
          <a
            href="mailto:loz@lawrencereed.co.uk"
            className="text-blue-500 hover:underline"
          >
            loz@lawrencereed.co.uk
          </a>
        </li> */}
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/lozenge/"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            linkedin.com/in/lozenge/
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/lozenge0"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            github.com/lozenge0
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
