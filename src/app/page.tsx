
// import React from 'react'
// import Hero from '@/components/homepage/Hero'
// import Carousel from '@/components/categoriesScroll'
// import Trending from '@/components/Trending'
// import MovieGrid from '@/components/homepage/Movies'
// import Sports from '@/components/homepage/sports'
// import EventCard from '@/components/Events'
// import Horizantalcard from '@/components/Ads'
// import Offers from '@/components/Rewards'
// import image from '../../public/images/ads.png'


// const page = () => {
// return (
//     <div>

// <Hero/>
// <Carousel/>
// <Trending/>
// <Horizantalcard image={image}/>
// <MovieGrid/>
// <Horizantalcard image={image}/>
// <EventCard/>
// <Horizantalcard image={image}/>
// <Sports/>
// <Horizantalcard image={image}/>
// <Offers/>

//     </div>
//   )
// }

// export default page


'use client'
import React from 'react'
import Hero from '@/components/homepage/Hero'
import Carousel from '@/components/categoriesScroll'

import MovieGrid from '@/components/homepage/Movies'


import Horizantalcard from '@/components/Ads'
import Offers from '@/components/Rewards'
import image1 from '../../public/images/ad1.png'
import image2 from '../../public/images/ad2.png'
import image3 from '../../public/images/ad3.png'
import { useState,useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance'
const Page = () => {

  const [categories, setCategories] = useState<Category[]>([]);
const [heroEvents,setHeroEvents]=useState<any>([])
const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/api/v1/category-events/categories-with-events');
       
        setCategories(res.data.data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
  useEffect(() => {
    
fetchSpecialevents()
    fetchCategories();
  }, []);
  const fetchSpecialevents = async () => {
    try {
      const response = await axiosInstance(`/api/v1/events/latest/category-or-subcategory/events`)
      setHeroEvents(response.data.data.events)
    } catch (error) {
      console.error(error)
    }
  }
return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="mb-8">
        <Hero/>
      </div>

      {/* Categories Carousel */}
      <div className="mb-12">
        <Carousel/>
      </div>

      {/* Dynamic Category Sections */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.category_id} className="space-y-8">
            <MovieGrid 
              movies={category.events} 
              categoryName={category.category_name} 
              slug={category.category_slug}
            />
            <Horizantalcard image={image1} />
          </div>
        ))}
      </div>

      {/* Final Offers Section */}
      <div className="mt-16">
        <Offers/>
      </div>
    </div>
  )
}

export default Page


