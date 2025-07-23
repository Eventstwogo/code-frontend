
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
import Trending from '@/components/Trending'
import MovieGrid from '@/components/homepage/Movies'

import EventCard from '@/components/Events'
import Horizantalcard from '@/components/Ads'
import Offers from '@/components/Rewards'
import image from '../../public/images/ads.png'
import { useState,useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance'
const Page = () => {
    const movies = [
      { title: "The Dark Knight", image: "/images/movie1.jfif", duration: 120 },
      { title: "Inception", image: "/images/movie2.jfif", duration: 152 },
      { title: "Interstellar", image: "/images/movie3.jfif", duration: 148 },
      { title: "Tenet", image: "/images/movie4.jfif", duration: 169 },
      { title: "Oppenheimer", image: "/images/movie5.jfif", duration: 150 },
    ];
    const sportsEvents = [
  {
    title: "Premier League Match",
    image: "/images/sport3.jpg",
    duration: 90,
  },
  {
    title: "NBA Finals",
    image: "/images/sport1.jfif",
    duration: 48,
  },
  {
    title: "Cricket World Cup",
    image: "/images/sport2.jpg",
    duration: 300,
  },
  {
    title: "Grand Slam Tennis",
    image: "/images/sport3.jpg",
    duration: 180,
  },
  {
    title: "Formula 1 Race",
    image: "/images/sport4.jpg",
    duration: 120,
  },
];
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
    <div>

<Hero/>
<Carousel/>
<Trending/>
<Horizantalcard image={image}/>
<EventCard event={heroEvents}/>
 {categories.map((category) => (
        <div key={category.category_id}>
          <Horizantalcard image={image} />
          <MovieGrid movies={category.events} categoryName={category.category_name} slug={category.category_slug}/>
        </div>
      ))}
      <Horizantalcard image={image}/>
<Offers/>

    </div>
  )
}

export default Page


