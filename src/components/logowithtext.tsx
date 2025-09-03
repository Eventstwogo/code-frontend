import React from 'react';

const LogoWithText: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <img
        src="/images/logo1.png"
        alt="Logo"
        className="w-16 h-16 object-contain"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">Events2go</h1>
      
      </div>
    </div>
  );
};

export default LogoWithText;
