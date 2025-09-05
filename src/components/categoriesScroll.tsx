// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import styles from "../components/css/Carousel.module.css";
// import { useCategoryStore } from "@/lib/ZustanStore/categoriesStore";

// const Carousel: React.FC = () => {
//   const { categories, fetchCategories } = useCategoryStore() as any;

//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );

//   const getSideCount = (width: number) => {
//     if (width < 768) return 1;        // 3 cards
//     if (width < 1024) return 2;       // 5 cards
//     return 3;                         // 7 cards
//   };

//   const [sideCount, setSideCount] = useState(getSideCount(windowWidth));
//   const [currentIndex, setCurrentIndex] = useState(sideCount);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const [dragDistance, setDragDistance] = useState(0);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       setWindowWidth(newWidth);
//       const newSideCount = getSideCount(newWidth);
//       setSideCount(newSideCount);
//       setCurrentIndex(newSideCount);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredCategories = categories.filter(
//     (cat: any) => !!cat.category_img_thumbnail
//   );

//   // ✅ Use carousel even if only 1 item (infinite loop logic handles it)
//   const useCarousel = filteredCategories.length >= 1;

//   const originalImages = useCarousel
//     ? filteredCategories.map((cat: any) => `${cat.category_img_thumbnail}`)
//     : [];

//   const imageDescriptions = useCarousel
//     ? filteredCategories.map((cat: any) => cat.category_name)
//     : [];

//   const images = useCarousel
//     ? [
//         ...originalImages.slice(-sideCount),
//         ...originalImages,
//         ...originalImages.slice(0, sideCount),
//       ]
//     : [];

//   const descriptions = useCarousel
//     ? [
//         ...imageDescriptions.slice(-sideCount),
//         ...imageDescriptions,
//         ...imageDescriptions.slice(0, sideCount),
//       ]
//     : [];

//   const nextSlide = () => {
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev - 1);
//   };

//   useEffect(() => {
//     if (!useCarousel) return;

//     if (currentIndex >= originalImages.length + sideCount) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(sideCount);
//         setTimeout(() => setIsTransitioning(true), 50);
//       }, 600);
//     } else if (currentIndex < sideCount) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(originalImages.length + sideCount - 1);
//         setTimeout(() => setIsTransitioning(true), 50);
//       }, 600);
//     }
//   }, [currentIndex, sideCount, originalImages.length, useCarousel]);

//   useEffect(() => {
//     if (!useCarousel) return;
//     const interval = setInterval(() => nextSlide(), 4000);
//     return () => clearInterval(interval);
//   }, [useCarousel]);

//   const getResponsiveDimensions = () => {
//     if (windowWidth >= 1400) {
//       return {
//         spacing: { pos1: 240, pos2: 420, pos3: 600 },
//         activeImage: { width: 350, height: 500 },
//         inactiveImage: { width: 280, height: 400 },
//       };
//     } else if (windowWidth >= 1200) {
//       return {
//         spacing: { pos1: 200, pos2: 350, pos3: 500 },
//         activeImage: { width: 320, height: 460 },
//         inactiveImage: { width: 250, height: 360 },
//       };
//     } else if (windowWidth >= 1024) {
//       return {
//         spacing: { pos1: 160, pos2: 280, pos3: 400 },
//         activeImage: { width: 280, height: 400 },
//         inactiveImage: { width: 220, height: 320 },
//       };
//     } else if (windowWidth >= 768) {
//       return {
//         spacing: { pos1: 120, pos2: 210, pos3: 300 },
//         activeImage: { width: 240, height: 340 },
//         inactiveImage: { width: 180, height: 260 },
//       };
//     } else if (windowWidth >= 480) {
//       return {
//         spacing: { pos1: 80, pos2: 140, pos3: 200 },
//         activeImage: { width: 200, height: 280 },
//         inactiveImage: { width: 150, height: 220 },
//       };
//     } else {
//       // Extra small screens (< 480px)
//       return {
//         spacing: { pos1: 60, pos2: 100, pos3: 140 },
//         activeImage: { width: 160, height: 240 },
//         inactiveImage: { width: 120, height: 180 },
//       };
//     }
//   };

//   const getTransform = (i: number, currentIndex: number) => {
//     const base = "translate(-50%, -50%)";
//     const diff = i - currentIndex;
//     const dims = getResponsiveDimensions();
//     const dragOffset = isDragging ? dragDistance * 0.3 : 0;

//     switch (diff) {
//       case -3:
//         return `${base} translateX(${-dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(45deg) scale(0.8)`;
//       case -2:
//         return `${base} translateX(${-dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(35deg) scale(0.85)`;
//       case -1:
//         return `${base} translateX(${-dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(25deg) scale(0.9)`;
//       case 0:
//         return `${base} translateX(${dragOffset}px) translateZ(50px) rotateY(0deg) scale(1)`;
//       case 1:
//         return `${base} translateX(${dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(-25deg) scale(0.9)`;
//       case 2:
//         return `${base} translateX(${dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(-35deg) scale(0.85)`;
//       case 3:
//         return `${base} translateX(${dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(-45deg) scale(0.8)`;
//       default:
//         if (diff < -3) {
//           return `${base} translateX(${-dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(60deg) scale(0.4)`;
//         } else {
//           return `${base} translateX(${dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(-60deg) scale(0.4)`;
//         }
//     }
//   };

//   const getOpacity = (i: number, currentIndex: number) =>
//     Math.abs(i - currentIndex) <= sideCount ? 1 : 0;

//   const getItemClass = (position: number) => {
//     if (position === 0) return styles.active;
//     if (position < 0) return styles.left;
//     return styles.right;
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setDragStart(e.clientX);
//     setDragDistance(0);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     setDragDistance(e.clientX - dragStart);
//   };

//   const handleMouseUp = () => {
//     if (!isDragging) return;
//     const threshold = 50;
//     if (Math.abs(dragDistance) > threshold) {
//       dragDistance > 0 ? prevSlide() : nextSlide();
//     }
//     setIsDragging(false);
//     setDragStart(0);
//     setDragDistance(0);
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) handleMouseUp();
//   };

//   // Touch event handlers for mobile
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setIsDragging(true);
//     setDragStart(e.touches[0].clientX);
//     setDragDistance(0);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging) return;
//     setDragDistance(e.touches[0].clientX - dragStart);
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     const threshold = 50;
//     if (Math.abs(dragDistance) > threshold) {
//       dragDistance > 0 ? prevSlide() : nextSlide();
//     }
//     setIsDragging(false);
//     setDragStart(0);
//     setDragDistance(0);
//   };

//   return (
//     <div className={`${styles.carouselContainer} hidden md:block`}>
//       {useCarousel ? (
//         <div
//           className={styles.carousel}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{ cursor: isDragging ? "grabbing" : "grab" }}
//         >
//           {images.map((image, i) => {
//             const position = i - currentIndex;
//             const isVisible = Math.abs(position) <= sideCount;
//             const dims = getResponsiveDimensions();
//             const targetIndex = (i - sideCount + filteredCategories.length) % filteredCategories.length;
//             const categorySlug = filteredCategories[targetIndex]?.category_slug;

//             return (
//               <Link
//                 key={`${image}-${i}`}
//                 href={`/${categorySlug}`}
//                 className={`${styles.carouselItem} ${getItemClass(position)} ${
//                   isTransitioning ? styles.transitioning : styles.noTransition
//                 }`}
//                 style={{
//                   transform: getTransform(i, currentIndex),
//                   opacity: getOpacity(i, currentIndex),
//                   zIndex: 10 - Math.abs(position),
//                   visibility: isVisible ? "visible" : "hidden",
//                 }}
//               >
//                 <Image
//                   src={image}
//                   alt={`Category ${i + 1}`}
//                   width={
//                     position === 0
//                       ? dims.activeImage.width
//                       : dims.inactiveImage.width
//                   }
//                   height={
//                     position === 0
//                       ? dims.activeImage.height
//                       : dims.inactiveImage.height
//                   }
//                   className={styles.image}
//                 />
//                 {isVisible && (
//                   <div className={styles.imageText}>{descriptions[i]}</div>
//                 )}
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {filteredCategories.map((cat: any, idx: number) => (
//             <Link
//               key={idx}
//               href={`/${cat.category_slug}`}
//               className="relative rounded-lg overflow-hidden shadow-md bg-white"
//             >
//               <Image
//                 src={cat.category_img_thumbnail}
//                 alt={cat.category_name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-48"
//               />
//               <div className="p-4 text-center font-bold">
//                 {cat.category_name}
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carousel;



// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import styles from "../components/css/Carousel.module.css";
// import { useCategoryStore } from "@/lib/ZustanStore/categoriesStore";

// const Carousel: React.FC = () => {
//   const { categories, fetchCategories } = useCategoryStore() as any;

//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );

//   const getSideCount = (width: number) => {
//     if (width < 768) return 1;        // 3 cards
//     if (width < 1024) return 2;       // 5 cards
//     return 3;                         // 7 cards
//   };

//   const [sideCount, setSideCount] = useState(getSideCount(windowWidth));
//   const [currentIndex, setCurrentIndex] = useState(sideCount);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const [dragDistance, setDragDistance] = useState(0);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       setWindowWidth(newWidth);
//       const newSideCount = getSideCount(newWidth);
//       setSideCount(newSideCount);
//       setCurrentIndex(newSideCount);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredCategories = categories.filter(
//     (cat: any) => !!cat.category_img_thumbnail
//   );

//   const useCarousel = filteredCategories.length >= 1;

//   const originalImages = useCarousel
//     ? filteredCategories.map((cat: any) => `${cat.category_img_thumbnail}`)
//     : [];

//   const imageDescriptions = useCarousel
//     ? filteredCategories.map((cat: any) => cat.category_name)
//     : [];

//   const images = useCarousel
//     ? [
//         ...originalImages.slice(-sideCount),
//         ...originalImages,
//         ...originalImages.slice(0, sideCount),
//       ]
//     : [];

//   const descriptions = useCarousel
//     ? [
//         ...imageDescriptions.slice(-sideCount),
//         ...imageDescriptions,
//         ...imageDescriptions.slice(0, sideCount),
//       ]
//     : [];

//   const nextSlide = () => {
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     setIsTransitioning(true);
//     setCurrentIndex((prev) => prev - 1);
//   };

//   useEffect(() => {
//     if (!useCarousel) return;

//     if (currentIndex >= originalImages.length + sideCount) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(sideCount);
//         setTimeout(() => setIsTransitioning(true), 50);
//       }, 600);
//     } else if (currentIndex < sideCount) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(originalImages.length + sideCount - 1);
//         setTimeout(() => setIsTransitioning(true), 50);
//       }, 600);
//     }
//   }, [currentIndex, sideCount, originalImages.length, useCarousel]);

//   useEffect(() => {
//     if (!useCarousel) return;
//     const interval = setInterval(() => nextSlide(), 4000);
//     return () => clearInterval(interval);
//   }, [useCarousel]);

//   const getResponsiveDimensions = () => {
//     if (windowWidth >= 1400) {
//       return {
//         spacing: { pos1: 240, pos2: 420, pos3: 600 },
//         activeImage: { width: 350, height: 500 },
//         inactiveImage: { width: 280, height: 400 },
//       };
//     } else if (windowWidth >= 1200) {
//       return {
//         spacing: { pos1: 200, pos2: 350, pos3: 500 },
//         activeImage: { width: 320, height: 460 },
//         inactiveImage: { width: 250, height: 360 },
//       };
//     } else if (windowWidth >= 1024) {
//       return {
//         spacing: { pos1: 160, pos2: 280, pos3: 400 },
//         activeImage: { width: 280, height: 400 },
//         inactiveImage: { width: 220, height: 320 },
//       };
//     } else if (windowWidth >= 768) {
//       return {
//         spacing: { pos1: 120, pos2: 210, pos3: 300 },
//         activeImage: { width: 240, height: 340 },
//         inactiveImage: { width: 180, height: 260 },
//       };
//     } else if (windowWidth >= 480) {
//       return {
//         spacing: { pos1: 80, pos2: 140, pos3: 200 },
//         activeImage: { width: 200, height: 280 },
//         inactiveImage: { width: 150, height: 220 },
//       };
//     } else {
//       return {
//         spacing: { pos1: 60, pos2: 100, pos3: 140 },
//         activeImage: { width: 160, height: 240 },
//         inactiveImage: { width: 120, height: 180 },
//       };
//     }
//   };

//   const getTransform = (i: number, currentIndex: number) => {
//     const base = "translate(-50%, -50%)";
//     const diff = i - currentIndex;
//     const dims = getResponsiveDimensions();
//     const dragOffset = isDragging ? dragDistance * 0.3 : 0;

//     switch (diff) {
//       case -3:
//         return `${base} translateX(${-dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(45deg) scale(0.8)`;
//       case -2:
//         return `${base} translateX(${-dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(35deg) scale(0.85)`;
//       case -1:
//         return `${base} translateX(${-dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(25deg) scale(0.9)`;
//       case 0:
//         return `${base} translateX(${dragOffset}px) translateZ(50px) rotateY(0deg) scale(1)`;
//       case 1:
//         return `${base} translateX(${dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(-25deg) scale(0.9)`;
//       case 2:
//         return `${base} translateX(${dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(-35deg) scale(0.85)`;
//       case 3:
//         return `${base} translateX(${dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(-45deg) scale(0.8)`;
//       default:
//         if (diff < -3) {
//           return `${base} translateX(${-dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(60deg) scale(0.4)`;
//         } else {
//           return `${base} translateX(${dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(-60deg) scale(0.4)`;
//         }
//     }
//   };

//   const getOpacity = (i: number, currentIndex: number) =>
//     Math.abs(i - currentIndex) <= sideCount ? 1 : 0;

//   const getItemClass = (position: number) => {
//     if (position === 0) return styles.active;
//     if (position < 0) return styles.left;
//     return styles.right;
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setDragStart(e.clientX);
//     setDragDistance(0);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     setDragDistance(e.clientX - dragStart);
//   };

//   const handleMouseUp = () => {
//     if (!isDragging) return;
//     const threshold = 50;
//     if (Math.abs(dragDistance) > threshold) {
//       dragDistance > 0 ? prevSlide() : nextSlide();
//     }
//     setIsDragging(false);
//     setDragStart(0);
//     setDragDistance(0);
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) handleMouseUp();
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setIsDragging(true);
//     setDragStart(e.touches[0].clientX);
//     setDragDistance(0);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging) return;
//     setDragDistance(e.touches[0].clientX - dragStart);
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     const threshold = 50;
//     if (Math.abs(dragDistance) > threshold) {
//       dragDistance > 0 ? prevSlide() : nextSlide();
//     }
//     setIsDragging(false);
//     setDragStart(0);
//     setDragDistance(0);
//   };

//   return (
//     <div className={`${styles.carouselContainer} hidden md:block relative`}>
//       {useCarousel ? (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all duration-300"
//             aria-label="Previous slide"
//           >
//             <svg
//               className="w-6 h-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <div
//             className={styles.carousel}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseLeave}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             style={{ cursor: isDragging ? "grabbing" : "grab" }}
//           >
//             {images.map((image, i) => {
//               const position = i - currentIndex;
//               const isVisible = Math.abs(position) <= sideCount;
//               const dims = getResponsiveDimensions();
//               const targetIndex = (i - sideCount + filteredCategories.length) % filteredCategories.length;
//               const categorySlug = filteredCategories[targetIndex]?.category_slug;

//               return (
//                 <Link
//                   key={`${image}-${i}`}
//                   href={`/${categorySlug}`}
//                   className={`${styles.carouselItem} ${getItemClass(position)} ${
//                     isTransitioning ? styles.transitioning : styles.noTransition
//                   }`}
//                   style={{
//                     transform: getTransform(i, currentIndex),
//                     opacity: getOpacity(i, currentIndex),
//                     zIndex: 10 - Math.abs(position),
//                     visibility: isVisible ? "visible" : "hidden",
//                   }}
//                 >
//                   <Image
//                     src={image}
//                     alt={`Category ${i + 1}`}
//                     width={
//                       position === 0
//                         ? dims.activeImage.width
//                         : dims.inactiveImage.width
//                     }
//                     height={
//                       position === 0
//                         ? dims.activeImage.height
//                         : dims.inactiveImage.height
//                     }
//                     className={styles.image}
//                   />
//                   {isVisible && (
//                     <div className={styles.imageText}>{descriptions[i]}</div>
//                   )}
//                 </Link>
//               );
//             })}
//           </div>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all duration-300"
//             aria-label="Next slide"
//           >
//             <svg
//               className="w-6 h-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {filteredCategories.map((cat: any, idx: number) => (
//             <Link
//               key={idx}
//               href={`/${cat.category_slug}`}
//               className="relative rounded-lg overflow-hidden shadow-md bg-white"
//             >
//               <Image
//                 src={cat.category_img_thumbnail}
//                 alt={cat.category_name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-48"
//               />
//               <div className="p-4 text-center font-bold">
//                 {cat.category_name}
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carousel;


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/css/Carousel.module.css";
import { useCategoryStore } from "@/lib/ZustanStore/categoriesStore";

const Carousel: React.FC = () => {
  const { categories, fetchCategories } = useCategoryStore() as any;

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const getSideCount = (width: number) => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const [sideCount, setSideCount] = useState(getSideCount(windowWidth));
  const [currentIndex, setCurrentIndex] = useState(sideCount);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      const newSideCount = getSideCount(newWidth);
      setSideCount(newSideCount);
      setCurrentIndex(newSideCount);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = categories.filter(
    (cat: any) => !!cat.category_img_thumbnail
  );

  const useCarousel = filteredCategories.length >= 1;

  const originalImages = useCarousel
    ? filteredCategories.map((cat: any) => `${cat.category_img_thumbnail}`)
    : [];

  const imageDescriptions = useCarousel
    ? filteredCategories.map((cat: any) => cat.category_name)
    : [];

  const images = useCarousel
    ? [
        ...originalImages.slice(-sideCount),
        ...originalImages,
        ...originalImages.slice(0, sideCount),
      ]
    : [];

  const descriptions = useCarousel
    ? [
        ...imageDescriptions.slice(-sideCount),
        ...imageDescriptions,
        ...imageDescriptions.slice(0, sideCount),
      ]
    : [];

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!useCarousel) return;

    if (currentIndex >= originalImages.length + sideCount) {
      requestAnimationFrame(() => {
        setIsTransitioning(false);
        setCurrentIndex(sideCount);
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    } else if (currentIndex < sideCount) {
      requestAnimationFrame(() => {
        setIsTransitioning(false);
        setCurrentIndex(originalImages.length + sideCount - 1);
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  }, [currentIndex, sideCount, originalImages.length, useCarousel]);

  useEffect(() => {
    if (!useCarousel) return;
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [useCarousel]);

  const getResponsiveDimensions = () => {
    if (windowWidth >= 1400) {
      return {
        spacing: { pos1: 240, pos2: 420, pos3: 600 },
        activeImage: { width: 350, height: 500 },
        inactiveImage: { width: 280, height: 400 },
      };
    } else if (windowWidth >= 1200) {
      return {
        spacing: { pos1: 200, pos2: 350, pos3: 500 },
        activeImage: { width: 320, height: 460 },
        inactiveImage: { width: 250, height: 360 },
      };
    } else if (windowWidth >= 1024) {
      return {
        spacing: { pos1: 160, pos2: 280, pos3: 400 },
        activeImage: { width: 280, height: 400 },
        inactiveImage: { width: 220, height: 320 },
      };
    } else if (windowWidth >= 768) {
      return {
        spacing: { pos1: 120, pos2: 210, pos3: 300 },
        activeImage: { width: 240, height: 340 },
        inactiveImage: { width: 180, height: 260 },
      };
    } else if (windowWidth >= 480) {
      return {
        spacing: { pos1: 80, pos2: 140, pos3: 200 },
        activeImage: { width: 200, height: 280 },
        inactiveImage: { width: 150, height: 220 },
      };
    } else {
      return {
        spacing: { pos1: 60, pos2: 100, pos3: 140 },
        activeImage: { width: 160, height: 240 },
        inactiveImage: { width: 120, height: 180 },
      };
    }
  };

  const getTransform = (i: number, currentIndex: number) => {
    const base = "translate(-50%, -50%)";
    const diff = i - currentIndex;
    const dims = getResponsiveDimensions();
    const dragOffset = isDragging ? dragDistance * 0.3 : 0;

    switch (diff) {
      case -3:
        return `${base} translateX(${-dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(45deg) scale(0.8)`;
      case -2:
        return `${base} translateX(${-dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(35deg) scale(0.85)`;
      case -1:
        return `${base} translateX(${-dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(25deg) scale(0.9)`;
      case 0:
        return `${base} translateX(${dragOffset}px) translateZ(50px) rotateY(0deg) scale(1)`;
      case 1:
        return `${base} translateX(${dims.spacing.pos1 + dragOffset}px) translateZ(-50px) rotateY(-25deg) scale(0.9)`;
      case 2:
        return `${base} translateX(${dims.spacing.pos2 + dragOffset}px) translateZ(-100px) rotateY(-35deg) scale(0.85)`;
      case 3:
        return `${base} translateX(${dims.spacing.pos3 + dragOffset}px) translateZ(-150px) rotateY(-45deg) scale(0.8)`;
      default:
        if (diff < -3) {
          return `${base} translateX(${-dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(60deg) scale(0.4)`;
        } else {
          return `${base} translateX(${dims.spacing.pos3 * 1.25 + dragOffset}px) translateZ(-200px) rotateY(-60deg) scale(0.4)`;
        }
    }
  };

  const getOpacity = (i: number, currentIndex: number) =>
    Math.abs(i - currentIndex) <= sideCount ? 1 : 0;

  const getItemClass = (position: number) => {
    if (position === 0) return styles.active;
    if (position < 0) return styles.left;
    return styles.right;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDistance(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragDistance) > threshold) {
      dragDistance > 0 ? prevSlide() : nextSlide();
    }
    setIsDragging(false);
    setDragStart(0);
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragDistance(e.touches[0].clientX - dragStart);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragDistance) > threshold) {
      dragDistance > 0 ? prevSlide() : nextSlide();
    }
    setIsDragging(false);
    setDragStart(0);
    setDragDistance(0);
  };

  return (
    <div className={`${styles.carouselContainer} hidden md:block relative`}>
      {useCarousel ? (
        <>
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carousel Items */}
          <div
            className={styles.carousel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {images.map((image, i) => {
              const position = i - currentIndex;
              const isVisible = Math.abs(position) <= sideCount;
              const dims = getResponsiveDimensions();
              const targetIndex =
                (i - sideCount + filteredCategories.length) %
                filteredCategories.length;
              const categorySlug =
                filteredCategories[targetIndex]?.category_slug;

              return (
                <Link
                  key={`${image}-${i}`}
                  href={`/${categorySlug}`}
                  className={`${styles.carouselItem} ${getItemClass(position)} ${
                    isTransitioning ? styles.transitioning : styles.noTransition
                  }`}
                  style={{
                    transform: getTransform(i, currentIndex),
                    opacity: getOpacity(i, currentIndex),
                    zIndex: 10 - Math.abs(position),
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Category ${i + 1}`}
                    width={
                      position === 0
                        ? dims.activeImage.width
                        : dims.inactiveImage.width
                    }
                    height={
                      position === 0
                        ? dims.activeImage.height
                        : dims.inactiveImage.height
                    }
                    className={styles.image}
                  />
                  {isVisible && (
                    <div className={styles.imageText}>{descriptions[i]}</div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredCategories.map((cat: any, idx: number) => (
            <Link
              key={idx}
              href={`/${cat.category_slug}`}
              className="relative rounded-lg overflow-hidden shadow-md bg-white"
            >
              <Image
                src={cat.category_img_thumbnail}
                alt={cat.category_name}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4 text-center font-bold">
                {cat.category_name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
