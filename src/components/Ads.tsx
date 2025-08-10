'use client';

import React from 'react';

export default function Horizantalcard({ image }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="w-full h-32 md:h-50 rounded-xl relative shadow-lg overflow-hidden">
        
        {/* Optional Background Image */}
        {image && (
          <img
            src='/images/ad1.png'
            alt="Advertisement"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Text Overlay */}
      
      </div>
    </div>
  );
}
