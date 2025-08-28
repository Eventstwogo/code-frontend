'use client'
import React, { useEffect } from 'react'
import HeroSection from '../Herosection';
import axiosInstance from '@/lib/axiosInstance';


const Hero = () => {
  const [movies,setMovies]=React.useState([])
 const fetchcategoryevents=async()=>{
        try {
            const response=await axiosInstance.get('api/v1/new-events/by-category/latest?event_type=upcoming')
            setMovies(response.data.data.events)
        }
        catch(error){
         console.log("error")}
    }
  useEffect(()=>{
   
    fetchcategoryevents()
  },[])

  return (
    <div>
  <HeroSection  movies={movies}/>
    </div>
  )
}

export default Hero
