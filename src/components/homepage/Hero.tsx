'use client'
import React, { useEffect } from 'react'
import HeroSection from '../Herosection';
import axiosInstance from '@/lib/axiosInstance';
export const movieCards = [
  {
    title: "X-Men: Apocalypse",
    imageUrl: "/images/hero.jfif",
    description: "Mutants unite to face the ancient enemy threatening the world. Witness the rise of Apocalypse.",
    isOnSale: true,
  },
  {
    title: "Avengers: Endgame",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPDQmkR0nkmObTkF_9X-pzy3lXBkXxbQqNtg&s",
    description: "The Avengers assemble once more to reverse Thanos' destruction in the epic finale.",
    isOnSale: true,
  },
  {
    title: "The Batman",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsP5s9zJVp2ButhTXUzgvZY92Exm8Ut4sYRw&s",
    description: "A young Bruce Wayne uncovers deep corruption in Gotham. Darkness rises.",
    isOnSale: false,
  }
];

const Hero = () => {
const [movies,setMovies]=React.useState([])
  useEffect(()=>{
    const fetchcategoryevents=async()=>{
        try {
            const response=await axiosInstance.get('api/v1/events/by-category/latest')
            setMovies(response.data.data.events)
        }
        catch(error){
         console.log("error")}
    }
    fetchcategoryevents()
  },[])

  return (
    <div>
      <HeroSection  movies={movies}/>
    </div>
  )
}

export default Hero
