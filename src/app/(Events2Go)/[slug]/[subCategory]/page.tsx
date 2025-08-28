


'use client'

import React, { useEffect, useState } from 'react'
import HeroSection from '@/components/Categories/Hero'
import MovieCard from '@/components/movies'
import Link from 'next/link'
import axiosInstance from '@/lib/axiosInstance'
import { useParams } from 'next/navigation'
import { all } from 'axios'
import KangarooLoader from '@/components/ui/kangaroo'

const Page = () => {
  const params = useParams()
  const slug = params?.subCategory

  const [events, setEvents] = useState<any[]>([])
  const [heroEvents, setHeroEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [nowStreamingEvents, setNowStreamingEvents] = useState<any[]>([])
  const [comingSoonEvents, setComingSoonEvents] = useState<any[]>([])

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/new-category-events/events-by-slug/${slug}?page=1&limit=100&event_type=upcoming`
      )
      const allEvents = response.data.data.events || []

  const todayDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

const present = allEvents.filter((event: any) => {
  const start = new Date(event.event_dates[0]);
  const end = new Date(event.event_dates[event.event_dates.length - 1]);
  const today = new Date(todayDate);

  return start <= today && end >= today; // ongoing or starting today
});

const future = allEvents.filter((event: any) => {
  const start = new Date(event.event_dates[0]);
  const today = new Date(todayDate);

  return start > today; // strictly in the future
});


      setEvents(allEvents)
      setNowStreamingEvents(present)
      setComingSoonEvents(future)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHeroEvents = async () => {
    try {
      const response = await axiosInstance(
        `/api/v1/new-events/latest/category-or-subcategory/${slug}?event_type=upcoming`
      )
      setHeroEvents(response.data.data.events || [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true) // start
      await Promise.all([fetchEvents(), fetchHeroEvents()])
      setLoading(false) // end
    }
    loadData()
  }, [slug])
  if (loading) {
    return (
      <KangarooLoader/>
    )
  }
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      {heroEvents.length > 0 && <HeroSection event={heroEvents} />}

      {/* NOW STREAMING SECTION */}
      {nowStreamingEvents.length > 0 && (
        <section className="w-full px-10 py-20">
          <h1 className="text-5xl font-bold mb-10 text-gray-900">NOW STREAMING</h1>
          <section className="mx-auto ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{slug}</h2>
            </div>
           <div
className="
    flex md:grid 
    md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6
    gap-3 md:gap-6
    overflow-x-auto md:overflow-visible
    scrollbar-hide
  "
>
              {nowStreamingEvents.map((event, index) => (
                         <div
                      key={event.event_id}
                      className="flex-shrink-0 w-[80%] max-w-[240px] sm:w-[200px] md:w-auto"
                    >
                      <MovieCard
                        title={event.event_title}
                        image={event.card_image}
                        duration={event.duration || 120}
                        event_slug={event.event_slug}
                      />
                    </div>
              ))}
            </div>
          </section>
        </section>
      )}

      {/* COMING SOON SECTION */}
      {comingSoonEvents.length > 0 && (
        <section className="w-full px-10 py-20 bg-gray-50">
          <h1 className="text-5xl font-bold mb-10 text-gray-900">COMING SOON</h1>
          <section className="mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{slug}</h2>
            </div>
           <div
  className="
    flex md:grid 
    md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6
    gap-3 md:gap-6
    overflow-x-auto md:overflow-visible
    scrollbar-hide
  "
>
              {comingSoonEvents.map((event, index) => (
                          <div
                       key={event.event_id}
                       className="flex-shrink-0 w-[90%] max-w-[240px] sm:w-[200px] md:w-auto"
                     >
                       <MovieCard
                         title={event.event_title}
                         image={event.card_image}
                         duration={event.duration || 120}
                         event_slug={event.event_slug}
                       />
                     </div>
              ))}
            </div>
          </section>
        </section>
      )}

      {/* If both sections are empty */}
      {nowStreamingEvents.length === 0 && comingSoonEvents.length === 0 && (
        <div className="w-full px-10 py-20 text-center text-gray-500 text-lg">
          No events available for this category.
        </div>
      )}
    </div>
  )
}

export default Page
