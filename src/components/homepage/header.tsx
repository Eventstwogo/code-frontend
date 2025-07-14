// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Search, User, Menu } from 'lucide-react';
// import Link from 'next/link';
// type HeaderProps = {
//   categories: string[];
// };

// export default function Header({ categories }: HeaderProps) {
//   return (
//     <header className="flex items-center justify-between px-10 py-4 border-b shadow-sm bg-white ">
      
//       {/* Left: Logo */}
//       <div className="flex items-center space-x-2">
//         <Link href='/'>
//             <Image
//               src="/images/logo.png"
//               alt="EventsNego Logo"
//               width={70}
//               height={50}
//               priority
//             />
//           </Link>
//       </div>

//       {/* Center: Search Box */}
//       <div className="flex-1 mx-4 max-w-lg">
//         <div className="flex items-center border rounded-xl px-3 py-1 shadow-sm border-grey-900">
//           <Search className="h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search for Movies, Events, Plays, Sports and Activities"
//             className="flex-1 outline-none px-2 py-1 text-sm"
//           />
//         </div>
//       </div>

//       {/* Right: Categories and Icons */}
//       <div className="flex items-center space-x-6">
//         {categories.map((cat) => (
//           <a
//             key={cat.category_id}
//             href={`/${cat.category_name.toLowerCase()}`}
//             className="text-sm 2xl:text-xl font-medium hover:text-blue-600"
//           >
//             {cat.category_name}
//           </a>
//         ))}

      
//       </div>
//       <div className='flex gap-6'>
//        <Link href="/login">
//             <User className="h-6 w-6 cursor-pointer hover:text-blue-600 transition-colors" />
//           </Link>
//         <Menu className="h-6 w-6 cursor-pointer" />
//       </div>
//     </header>
//   );
// }



'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

type HeaderProps = {
  categories: { category_id: number; category_name: string }[];
};

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm bg-white w-full">
      {/* Top Row: Logo + Search + Icons/Menu */}
      <div
        className="
          flex items-center
          justify-between
          px-4 md:px-6 lg:px-10
          py-3 md:py-4
          space-x-2
        "
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="EventsNego Logo"
              width={50}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="
          flex items-center
          border rounded-xl
          px-2 py-1
          shadow-sm border-gray-300
          flex-1
          mx-2
          max-w-[140px] sm:max-w-[200px] md:max-w-md lg:max-w-lg
        ">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none px-2 py-1 text-xs sm:text-sm"
          />
        </div>

        {/* Right Side: User + Menu */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Link href="/login">
            <User className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-blue-600 transition-colors" />
          </Link>

          {/* Desktop Categories (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-6 ml-4">
            {categories.map((cat) => (
              <a
                key={cat.category_id}
                href={`/${cat.category_name.toLowerCase()}`}
                className="text-sm 2xl:text-xl font-medium hover:text-blue-600"
              >
                {cat.category_name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Icon (shown on small screens) */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-xl p-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold">Menu</p>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <a
                  key={cat.category_id}
                  href={`/${cat.category_name.toLowerCase()}`}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.category_name}
                </a>
              ))}
            </nav>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
