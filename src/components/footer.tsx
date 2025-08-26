// 'use client'
// import { useEffect } from "react";
// import { FaFacebookF, FaInstagram } from "react-icons/fa6";
// import Link from "next/link";
// import Image from "next/image";
// import { useCategoryStore } from "@/lib/ZustanStore/categoriesStore";

// export default function Footer() {

// const { categories,fetchCategories } = useCategoryStore();  
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);
//   return (
//     <footer className="bg-purple-900 text-white py-10 px-6 md:px-20 border-t">
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start text-sm">
//         {/* Logo and Tagline */}
//         <div className="md:col-span-1 flex flex-col items-start gap-2">
//           <Image
//             src="/images/logo1.png"
//             alt="Events2Go Logo"
//             width={80}
//             height={80}
//             className="h-20 w-auto"
//             priority
//           />
//           <p className="font-semibold text-lg">EVENTS 2 GO</p>
//           <p className="text-xs text-white">
//             &quot;Explore movies, trending events, workshops...&quot;
//           </p>
//         </div>

//         {/* Explore */}
//         <div>
//           <h4 className="font-bold mb-2">Explore</h4>
//           <ul className="space-y-1">
//            {
//   categories.map((category) => (
//               <li key={category.category_id}>
//                 <Link
//                   href={`/${category.category_slug}`}
//                   className="hover:underline"
//                 >
//                   {category.category_name}
//                 </Link>
//               </li>
//             ))
//            }
//           </ul>
//         </div>

//         {/* Help & Support */}
//         <div>
//           <h4 className="font-bold mb-2">Help & Support</h4>
//           <ul className="space-y-1">
//             <li>
//               <Link href="/contact" className="hover:underline">
//                 Contact Us
//               </Link>
//             </li>
//             <li> <Link href="/FAQs" className="hover:underline">FAQs</Link></li>
         
//           </ul>
//         </div>
//            <div>
//           <h4 className="font-bold mb-2">Plolocies</h4>
//           <ul className="space-y-1">
    
//             <li>
//               <Link href="/terms" className="hover:underline">
//                 Terms
//               </Link>
//             </li>
//             <li>
//               <Link href="/privacy" className="hover:underline">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>  <Link href="/Refund" className="hover:underline">
           
//        Refund Policy </Link>
//             </li>
//              <li>  <Link href="/Refund" className="hover:underline">
           
//        Security policy </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div className="flex flex-col gap-2">
//           <h4 className="font-bold">Social Media</h4>
//           <div className="flex gap-6 text-xl">
//             <Link
//               href="https://www.facebook.com/profile.php?id=61578893052150"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-600"
//             >
//               <FaFacebookF />
//             </Link>
//              <Link
//               href="https://www.instagram.com/event_s2go/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-500"
//             >
//               <FaInstagram />
//             </Link>
//             {/* <Link
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-black"
//             >
//               <FaXTwitter />
//             </Link>  */}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row */}
//       <div className="mt-10 border-t pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-white gap-2">
//         <p>© 2025 Events2Go. All Rights Reserved.</p>
//         <div className="flex gap-3">
//           <Image
//             src="/images/appstore.png"
//             alt="App Store"
//             width={120}
//             height={40}
//             className="h-6 w-auto"
//           />
//           <Image
//             src="/images/googleplay.png"
//             alt="Google Play"
//             width={120}
//             height={40}
//             className="h-6 w-auto"
//           />
//         </div>
//       </div>
//     </footer>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import {ChevronDown as DownIcon, ChevronUp as UpIcon} from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { useCategoryStore } from "@/lib/ZustanStore/categoriesStore";

export default function Footer() {
  const { categories, fetchCategories } = useCategoryStore();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <footer className="bg-purple-900 text-white py-10 px-6 md:px-20 border-t">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start text-sm">
        {/* Logo and Tagline */}
        <div className="md:col-span-1 flex flex-col items-start gap-2">
          <Image
            src="/images/logo1.png"
            alt="Events2Go Logo"
            width={80}
            height={80}
            className="h-20 w-auto"
            priority
          />
          <p className="font-semibold text-lg">EVENTS 2 GO</p>
          <p className="text-xs text-white">
            &quot;Explore movies, trending events, workshops...&quot;
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4
            className="font-bold mb-2 flex items-center justify-between cursor-pointer"
            onClick={() => setIsExploreOpen(!isExploreOpen)}
          >
            Explore
            <span className="md:hidden">{isExploreOpen ? <UpIcon/> : <DownIcon/>}</span>
          </h4>
          <ul
            className={`space-y-1 transition-max-height duration-300 ease-in-out overflow-hidden ${
              isExploreOpen ? "max-h-96" : "max-h-0"
            } md:max-h-none`}
            style={{
              transitionProperty: "max-height",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {categories.map((category) => (
              <li key={category.category_id}>
                <Link
                  href={`/${category.category_slug}`}
                  className="hover:underline"
                  onClick={() => setIsExploreOpen(false)}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h4
            className="font-bold mb-2 flex items-center justify-between cursor-pointer"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          >
            Help & Support
            <span className="md:hidden">{isHelpOpen ?<UpIcon/> : <DownIcon/>}</span>
          </h4>
          <ul
            className={`space-y-1 transition-max-height duration-300 ease-in-out overflow-hidden ${
              isHelpOpen ? "max-h-96" : "max-h-0"
            } md:max-h-none`}
            style={{
              transitionProperty: "max-height",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <li>
              <Link href="/contact" className="hover:underline" onClick={() => setIsHelpOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/FAQs" className="hover:underline" onClick={() => setIsHelpOpen(false)}>
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4
            className="font-bold mb-2 flex items-center justify-between cursor-pointer"
            onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
          >
            Policies
            <span className="md:hidden">{isPoliciesOpen ? <UpIcon/> : <DownIcon/>}</span>
          </h4>
          <ul
            className={`space-y-1 transition-max-height duration-300 ease-in-out overflow-hidden ${
              isPoliciesOpen ? "max-h-96" : "max-h-0"
            } md:max-h-none`}
            style={{
              transitionProperty: "max-height",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <li>
              <Link href="/terms" className="hover:underline" onClick={() => setIsPoliciesOpen(false)}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline" onClick={() => setIsPoliciesOpen(false)}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/Refund" className="hover:underline" onClick={() => setIsPoliciesOpen(false)}>
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/Refund" className="hover:underline" onClick={() => setIsPoliciesOpen(false)}>
                Security Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Social Media</h4>
          <div className="flex gap-6 text-xl">
            <Link
              href="https://www.facebook.com/profile.php?id=61578893052150"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.instagram.com/event_s2go/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-10 border-t pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-white gap-2">
        <p>© 2025 Events2Go. All Rights Reserved.</p>
        <div className="flex gap-3">
          <Image
            src="/images/appstore.png"
            alt="App Store"
            width={120}
            height={40}
            className="h-6 w-auto"
          />
          <Image
            src="/images/googleplay.png"
            alt="Google Play"
            width={120}
            height={40}
            className="h-6 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}