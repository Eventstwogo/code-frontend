// 'use client'
// import React, { useEffect, useState } from 'react'

// import HeroSection from '@/components/Categories/Hero'
// import MovieCard from '@/components/movies'
// import Link from 'next/link'
// import axiosInstance from '@/lib/axiosInstance'
   
// import { useParams } from 'next/navigation';
// const Page = () => {
//   const params = useParams(); // { category: 'sports', subcategory: 'Football' }
// const slug=params?.subCategory;
// // 



//   const [events,setEvents]=useState([])

//   const fetchEvents=async()=>{
//     try{
//         const response=await axiosInstance.get(`/api/v1/category-events/events-by-slug/${slug}?page=1&limit=10`)
//         setEvents(response.data.data.events)
//     }
//      catch(error){console.log(error)}
// }

 
//   useEffect(()=>{fetchEvents()},[])
// console.log(events)
//   return (
//     <div>
//         <HeroSection events={events} />


//       <section className='w-full px-10 py-20 '>
// <h1 className='text-5xl mb-10'>
//     NOW STREAMING
// </h1>
//  <section className=" mx-auto  ">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-900">{slug}</h2>
       
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
//         {events?.map((movie, index) => (
//           <MovieCard
//             key={index}
//             title={movie.event_title}
//             image={movie.card_image}
           
//           />
//         ))}
//       </div>
//     </section>

//       </section>

//        <section className='w-full px-10 py-20 '>
// <h1 className='text-5xl mb-10'>
//    Coming Soon
// </h1>
//  <section className=" mx-auto  ">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-900">{slug}</h2>
//         <Link
//           href="/trending"
//           className="text-base text-purple-600 hover:underline"
//         >
          
//         </Link>
//       </div>
//  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
//         {events?.map((movie, index) => (
//           <MovieCard
//             key={index}
//             title={movie.event_title}
//             image={movie.card_image}
           
//           />
//         ))}
//       </div>
//     </section>

//       </section>
      
//     </div>
//   )
// }

// export default Page





'use client'

import React, { useEffect, useState } from 'react'
import HeroSection from '@/components/Categories/Hero'
import MovieCard from '@/components/movies'
import Link from 'next/link'
import axiosInstance from '@/lib/axiosInstance'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams() // { category: 'sports', subCategory: 'football' }
  const slug = params?.subCategory

  const [events, setEvents] = useState([])
  const [heroEvents, setHeroEvents] = useState([])
  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/category-events/events-by-slug/${slug}?page=1&limit=10`
      )
      setEvents(response.data.data.events)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHeroevents= async () =>{
try {
  const response = await axiosInstance(`/api/v1/events/latest/category-or-subcategory/${slug}`)

setHeroEvents(response.data.data.events)
 console.log(events)
} catch (error) {
  console.error(error)
}
}
  useEffect(() => {
    fetchEvents()
    fetchHeroevents()
  }, [slug])
console.log('hero events are',heroEvents)
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      {events && events.length > 0 && (
        <HeroSection event={heroEvents} />
      )}

      {/* NOW STREAMING SECTION */}
      <section className="w-full px-10 py-20">
        <h1 className="text-5xl font-bold mb-10 text-gray-900">NOW STREAMING</h1>
        <section className="mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{slug}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
            {events && events.length > 0 ? (
              events.map((movie, index) => (
                <MovieCard
                  key={index}
                  title={movie.event_title}
                  image={movie.card_image}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No events available for this category.
              </div>
            )}
          </div>
        </section>
      </section>

      {/* COMING SOON SECTION */}
      <section className="w-full px-10 py-20 bg-gray-50">
        <h1 className="text-5xl font-bold mb-10 text-gray-900">COMING SOON</h1>
        <section className="mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{slug}</h2>
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
            {events && events.length > 0 ? (
              events.map((movie, index) => (
                <MovieCard
                  key={index}
                  title={movie.event_title}
                  image={movie.card_image}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No upcoming events for this category.
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  )
}

export default Page
