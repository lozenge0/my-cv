"use client";
import { useEffect, useState } from "react";

interface CookieBannerProps {
  onAccept: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
    onAccept();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col sm:flex-row items-center justify-between z-10">
      <p className="mb-2 sm:mb-0">
        This website uses cookies to improve your experience. Please accept our
        use of cookies. We only use it for essential performance tracking.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        I Accept Essential Cookies
      </button>
    </div>
  );
};

export default CookieBanner;
