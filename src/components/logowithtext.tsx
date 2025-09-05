import React from 'react';

const LogoWithText: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1 ">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-14 h-14 object-contain"
      />
      <div className="flex mt-4">
<h1
  className="text-2xl font-bold   text-[#55a4b4]"
  
>
  Events<span className='text-[#7f4ba2] '>2go</span>
</h1>



      
      </div>
    </div>
  );
};

export default LogoWithText;
