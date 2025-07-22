'use client'
import React, { useEffect, useState } from 'react'
import CategoryCards from '@/components/Categories/subcategories'
import HeroSection from '@/components/Categories/Hero'
import MovieCard from '@/components/movies'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
     const movies = [
    {
      title: "The Dark Knight",
      image: "/images/movie1.jfif",
      duration: 120,
    },
    {
      title: "Inception",
      image: "/images/movie2.jfif",
      duration: 152,
    },
    {
      title: "Interstellar",
      image: "/images/movie3.jfif",
      duration: 148,
    },
    {
      title: "Tenet",
      image: "/images/movie4.jfif",
      duration: 169,
    },
    {
      title: "oppenhiemer",
      image: "/images/movie5.jfif",
      duration: 150,
    },
     {
      title: "The Dark Knight",
      image: "/images/movie1.jfif",
      duration: 120,
    },
    {
      title: "Inception",
      image: "/images/movie2.jfif",
      duration: 152,
    },
    {
      title: "Interstellar",
      image: "/images/movie3.jfif",
      duration: 148,
    },
    {
      title: "Tenet",
      image: "/images/movie4.jfif",
      duration: 169,
    },
    {
      title: "oppenhiemer",
      image: "/images/movie5.jfif",
      duration: 150,
    },
     {
      title: "Inception",
      image: "/images/movie2.jfif",
      duration: 152,
    },
    {
      title: "Interstellar",
      image: "/images/movie3.jfif",
      duration: 148,
    },
  
  ];
  import { useCategoryStore } from '@/lib/ZustanStore/categoriesStore'
import axiosInstance from '@/lib/axiosInstance'
const Page = ({ params }: { params: { slug: string } }) => {
 const { slug } = params;

const fetchSubCategoriesBySlug = useCategoryStore(state => state.fetchSubCategoriesBySlug);
const subCategories = useCategoryStore(state => state.subCategories);

const notFound = useCategoryStore(state => state.notFound)
 const [events,setEvents] = useState([])

const fetchevents= async () =>{
try {
  const response = await axiosInstance(`/api/v1/events/category-or-subcategory/${slug}?page=1&per_page=10`)
 console.log(response.data.data.subcategories_with_events)
setEvents(response.data.data.subcategories_with_events)
 console.log(events)
} catch (error) {
  console.error(error)
}
}
useEffect(() => {
  fetchSubCategoriesBySlug(slug);
  fetchevents()
}, [slug]);
useEffect(() => {

  
  }, [notFound])

console.log(events)
  

  return (
    <div>
        <HeroSection event={events}/>
      <CategoryCards subcategories={subCategories} category={slug}/>

      <section className='w-full px-10 py-20 '>
<h1 className='text-5xl mb-10'>
    NOW STREAMING
</h1>
 <section className=" mx-auto  ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Movies</h2>
        <Link
          href="/trending"
          className="text-base text-purple-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            image={movie.image}
            duration={movie.duration}
          />
        ))}
      </div>
    </section>

      </section>

       <section className='w-full px-10 py-20 '>
<h1 className='text-5xl mb-10'>
   Coming Soon
</h1>
 <section className=" mx-auto  ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Movies</h2>
        <Link
          href="/trending"
          className="text-base text-purple-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-10">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            image={movie.image}
            duration={movie.duration}
          />
        ))}
      </div>
    </section>

      </section>
      
    </div>
  )
}

export default Page

// import { use } from "react";

// export default function SlugPage({ params }: { params: { slug: string } }) {
//   return (
//     <div>
//       <h1>Category: {params.slug}</h1>
//     </div>
//   );
// }

