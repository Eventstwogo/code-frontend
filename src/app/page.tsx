


// 'use client'
// import React from 'react'
// import Hero from '@/components/homepage/Hero'
// import Carousel from '@/components/categoriesScroll'

// import MovieGrid from '@/components/homepage/Movies'

// import CookiesPolicy from '@/components/cookie-polocy';
// import RotatingAds from '@/components/RotatingAds'
// import Partners from '@/components/Partners'
// import { useState,useEffect } from 'react'
// import axiosInstance from '@/lib/axiosInstance'
// import { Category } from '@/types'
// import FeaturedSection from '@/components/FeaturedSection'
// const Page = () => {

//   const [categories, setCategories] = useState<Category[]>([]);
// const [heroEvents,setHeroEvents]=useState<any>([])
// const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get('/api/v1/new-category-events/categories-with-events?event_type=upcoming');
       
//         setCategories(res.data.data.categories);
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };
//   useEffect(() => {
    
// fetchSpecialevents()
//     fetchCategories();
//   }, []);
//   const fetchSpecialevents = async () => {
//     try {
//       const response = await axiosInstance(`/api/v1/new-events/latest/category-or-subcategory/events`)
//       setHeroEvents(response.data.data.events)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="mb-8">
//         <Hero/>
//       </div>

//       {/* Categories Carousel */}
//       <div className="mb-12">
//         <Carousel/>
//       </div>


// <FeaturedSection/>
//       {/* Dynamic Category Sections */}
//       <div className="space-y-12">
//         {categories.map((category, index) => (
//           <div key={category.category_id} className="space-y-8">
//             <MovieGrid 
//               movies={category.events || []} 
//               categoryName={category.category_name} 
//               slug={category.category_slug}
//             />
//             <RotatingAds position={index} />
//           </div>
//         ))}
//       </div>

//       {/* Partners Section */}
//       <div className="mt-16">
//         <Partners/>
//       </div>
//       <CookiesPolicy />
//     </div>
//   )
// }

// export default Page


'use client'
import React, { useState, useEffect } from 'react'
import Hero from '@/components/homepage/Hero'
import Carousel from '@/components/categoriesScroll'
import MovieGrid from '@/components/homepage/Movies'
import CookiesPolicy from '@/components/cookie-polocy'
import RotatingAds from '@/components/RotatingAds'
import Partners from '@/components/Partners'
import axiosInstance from '@/lib/axiosInstance'
import { Category } from '@/types'
import FeaturedSection from '@/components/FeaturedSection'
import KangarooLoader from '@/components/ui/kangaroo'

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [heroEvents, setHeroEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // <-- loader state

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(
        '/api/v1/new-category-events/categories-with-events?event_type=upcoming'
      )
      setCategories(res.data.data.categories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchSpecialevents = async () => {
    try {
      const response = await axiosInstance(
        `/api/v1/new-events/latest/category-or-subcategory/events`
      )
      setHeroEvents(response.data.data.events)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchSpecialevents(), fetchCategories()])
      setLoading(false)
    }
    loadData()
  }, [])

  // Loader UI
  if (loading) {
    return (
      <KangarooLoader/>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="mb-8">
        <Hero />
      </div>

      {/* Categories Carousel */}
      <div className="mb-12">
        <Carousel />
      </div>

      {/* Featured Section */}
      <FeaturedSection />

      {/* Dynamic Category Sections */}
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div key={category.category_id} className="space-y-8">
            <MovieGrid
              movies={category.events || []}
              categoryName={category.category_name}
              slug={category.category_slug}
            />
            <RotatingAds position={index} />
          </div>
        ))}
      </div>

      {/* Partners Section */}
      <div className="mt-16">
        <Partners />
      </div>

      <CookiesPolicy />
    </div>
  )
}

export default Page
