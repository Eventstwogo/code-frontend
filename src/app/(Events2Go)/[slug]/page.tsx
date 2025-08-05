// 'use client'

// import React, { useEffect, useState } from 'react'
// import CategoryCards from '@/components/Categories/subcategories'
// import HeroSection from '@/components/Categories/Hero'
// import MovieCard from '@/components/movies'
// import Link from 'next/link'
// import { useCategoryStore } from '@/lib/ZustanStore/categoriesStore'
// import axiosInstance from '@/lib/axiosInstance'

// const Page = ({ params }: { params: { slug: string } }) => {
//   const { slug } = params

//   const fetchSubCategoriesBySlug = useCategoryStore(state => state.fetchSubCategoriesBySlug)
//   const subCategories = useCategoryStore(state => state.subCategories)
//   const notFound = useCategoryStore(state => state.notFound)

//   const [events, setEvents] = useState<any[]>([]) // unified format
//   const [heroEvents, setHeroEvents] = useState<any[]>([])

//   // Fetch latest events for hero section
//   const fetchHeroevents = async () => {
//     try {
//       const response = await axiosInstance(`/api/v1/events/latest/category-or-subcategory/${slug}`)
//       setHeroEvents(response.data?.data?.events || [])
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // Fetch subcategories or fallback to events
//   const fetchevents = async () => {
//     try {
//       const response = await axiosInstance(`/api/v1/events/category-or-subcategory/${slug}?page=1&per_page=10`)
//       const data = response.data?.data

//       if (data?.subcategories) {
//         setEvents(data.subcategories)
//       } else if (data?.events) {
//         setEvents([
//           {
//             subcategory_id: 'default',
//             subcategory_slug: slug,
//             events: data.events,
//           },
//         ])
//       } else {
//         setEvents([])
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchSubCategoriesBySlug(slug)
//     fetchHeroevents()
//     fetchevents()
//   }, [slug])
// console.log(events)
//   return (
//     <div className="w-full min-h-screen bg-white text-black">
//       {/* HERO SECTION */}
//       <HeroSection event={heroEvents} />

//       {/* SUBCATEGORY CARDS */}
//       {subCategories && subCategories.length > 0 && (
//   <CategoryCards subcategories={subCategories} category={slug} />
// )}


//       <section className="w-full px-10 py-20">
//         <h1 className="text-5xl font-bold mb-10 text-gray-900">NOW STREAMING</h1>

//         {events.length > 0 ? (
//           events.map((subcategory: any) => (
//             <section key={subcategory.subcategory_id} className="mb-16">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 capitalize">
//                   {subcategory.subcategory_slug.replace(/-/g, ' ')}
//                 </h2>
//               {subcategory.subcategory_id !== 'default' && (
//           <Link
//             href={`/${slug}/${subcategory.subcategory_slug}`}
//             className="text-base text-purple-600 hover:underline"
//           >
//             View All
//           </Link>
//         )}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
//                 {subcategory.events && subcategory.events.length > 0 ? (
//                   subcategory.events.map((event: any) => (
//                     <MovieCard
//                       key={event.event_id}
//                       title={event.event_title}
//                       image={event.card_image}
//                       duration={event.duration || 120}
//                       event_slug={event.event_slug}
//                     />
//                   ))
//                 ) : (
//                   <div className="col-span-full text-center text-gray-500 text-lg">
//                     No events in this subcategory.
//                   </div>
//                 )}
//               </div>
//             </section>
//           ))
//         ) : (
//           <div className="text-center text-gray-600 text-lg">
//             No events available under this category.
//           </div>
//         )}
//       </section>

//       {/* COMING SOON (optional) */}
//       <section className="w-full px-10 py-20 bg-gray-50">
//         <h1 className="text-5xl font-bold mb-10 text-gray-900">COMING SOON</h1>

//         <section className="mx-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-bold text-gray-900 capitalize">{slug.replace(/-/g, ' ')}</h2>
//             {/* <Link
//               href="/trending"
//               className="text-base text-purple-600 hover:underline"
//             >
//               View All
//             </Link> */}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
//             {heroEvents && heroEvents.length > 0 ? (
//               heroEvents.map((event: any) => (
//                 <MovieCard
//                   key={event.event_id}
//                   title={event.event_title}
//                   image={event.card_image}
//                   duration={event.duration || 120}
//                   event_slug={event.event_slug}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 text-lg">
//                 No upcoming events found.
//               </div>
//             )}
//           </div>
//         </section>
//       </section>
//     </div>
//   )
// }

// export default Page



'use client';

import React, { useEffect, useState } from 'react';
import CategoryCards from '@/components/Categories/subcategories';
import HeroSection from '@/components/Categories/Hero';
import MovieCard from '@/components/movies';
import Link from 'next/link';
import { useCategoryStore } from '@/lib/ZustanStore/categoriesStore';
import axiosInstance from '@/lib/axiosInstance';

const categorizeEventsByDate = (eventsBySubcategory: any[]) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const presentEvents: any[] = [];
  const futureEvents: any[] = [];

  for (const subcategory of eventsBySubcategory) {
    const present = subcategory.events.filter((event: any) => event.start_date === today);
    const future = subcategory.events.filter((event: any) => event.start_date > today);

    if (present.length > 0) {
      presentEvents.push({
        ...subcategory,
        events: present,
      });
    }

    if (future.length > 0) {
      futureEvents.push({
        ...subcategory,
        events: future,
      });
    }
  }

  return { presentEvents, futureEvents };
};

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const fetchSubCategoriesBySlug = useCategoryStore(state => state.fetchSubCategoriesBySlug);
  const subCategories = useCategoryStore(state => state.subCategories);
  const notFound = useCategoryStore(state => state.notFound);

  const [heroEvents, setHeroEvents] = useState<any[]>([]);
  const [presentEvents, setPresentEvents] = useState<any[]>([]);
  const [futureEvents, setFutureEvents] = useState<any[]>([]);

  const fetchHeroEvents = async () => {
    try {
      const response = await axiosInstance(`/api/v1/events/latest/category-or-subcategory/${slug}`);
      setHeroEvents(response.data?.data?.events || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance(
        `/api/v1/events/category-or-subcategory/${slug}?page=1&per_page=10`
      );
      const data = response.data?.data;

      let rawEvents = [];

      if (data?.subcategories) {
        rawEvents = data.subcategories;
      } else if (data?.events) {
        rawEvents = [
          {
            subcategory_id: 'default',
            subcategory_slug: slug,
            events: data.events,
          },
        ];
      }

      const { presentEvents, futureEvents } = categorizeEventsByDate(rawEvents);
      setPresentEvents(presentEvents);
      setFutureEvents(futureEvents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubCategoriesBySlug(slug);
    fetchHeroEvents();
    fetchEvents();
  }, [slug]);

  const renderEventSection = (title: string, eventGroups: any[]) => (
    <section className="w-full px-10 py-20">
      <h1 className="text-5xl font-bold mb-10 text-gray-900">{title}</h1>

      {eventGroups.length > 0 ? (
        eventGroups.map((subcategory: any) => (
          <section key={subcategory.subcategory_id} className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {subcategory.subcategory_slug.replace(/-/g, ' ')}
              </h2>
              {subcategory.subcategory_id !== 'default' && (
                <Link
                  href={`/${slug}/${subcategory.subcategory_slug}`}
                  className="text-base text-purple-600 hover:underline"
                >
                  View All
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
              {subcategory.events && subcategory.events.length > 0 ? (
                subcategory.events.map((event: any) => (
                  <MovieCard
                    key={event.event_id}
                    title={event.event_title}
                    image={event.card_image}
                    duration={event.duration || 120}
                    event_slug={event.event_slug}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-lg">
                  No events in this subcategory.
                </div>
              )}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center text-gray-600 text-lg">No events found.</div>
      )}
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      <HeroSection event={heroEvents} />

      {/* SUBCATEGORY CARDS */}
      {subCategories && subCategories.length > 0 && (
        <CategoryCards subcategories={subCategories} category={slug} />
      )}

      {/* PRESENT EVENTS */}
      {renderEventSection('NOW STREAMING', presentEvents)}

      {/* FUTURE EVENTS */}
      {renderEventSection('COMING SOON', futureEvents)}
    </div>
  );
};

export default Page;
