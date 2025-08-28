"use client"; // for Next.js app router

import React from "react";

const WhatsAppButton = () => {
  let phoneNumber = "+61430194565"; // can include +, spaces, etc.
  const message = "Hello! I have a query.";

  // sanitize phone number (remove +, spaces, hyphens, parentheses)
  phoneNumber = phoneNumber.replace(/[^\d]/g, "");

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512" // better normalized viewBox
        className="w-8 h-8 fill-white"
      >
        <path d="M256.064 0C114.836 0 0 114.836 0 256.064c0 45.184 11.803 89.413 34.155 128.155L0 512l131.178-33.92c37.678 20.829 80.448 31.808 124.885 31.808 141.228 0 256.064-114.836 256.064-256.064S397.292 0 256.064 0zm0 466.944c-40.678 0-80.597-11.456-115.115-33.088l-8.235-5.12-71.424 18.56 19.051-69.589-4.779-7.466c-20.442-31.936-31.232-68.838-31.232-107.616 0-110.592 89.141-200.149 200.149-200.149s200.149 89.141 200.149 200.149c0 110.592-89.141 200.149-200.149 200.149zm107.349-147.669c-5.888-2.944-34.816-17.152-40.229-19.072-5.376-1.856-9.28-2.816-13.184 2.816-3.904 5.632-15.616 19.072-19.2 22.912-3.584 3.84-7.04 4.352-12.928 1.408-35.2-17.6-58.176-31.616-81.067-71.104-6.101-10.368 6.101-9.728 17.6-32.469 1.92-3.84.96-7.168-.512-10.112-1.408-2.816-13.184-31.744-18.048-43.392-4.736-11.52-9.6-9.984-13.184-10.24-3.392-.256-7.296-.307-11.2-.307-3.904 0-10.24 1.408-15.616 7.168-5.376 5.632-20.48 19.84-20.48 48.384s20.992 56.576 23.936 60.416c2.944 3.84 41.728 63.744 101.12 89.6 37.6 16.256 52.326 17.493 71.424 14.699 11.392-1.792 34.816-14.08 39.68-27.648 4.864-13.568 4.864-25.28 3.392-27.648-1.408-2.368-5.376-3.84-11.264-6.784z" />
      </svg>
      {/* Pulse Effect */}
      {/* <span className="absolute w-14 h-14 rounded-full bg-[#25D366] opacity-40 animate-ping"></span> */}
    </button>
  );
};

export default WhatsAppButton;
