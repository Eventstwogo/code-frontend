'use client'
import React from 'react'
import Moviesection from '@/components/moviesection'
import Filter from '@/components/filter/page'
import Details from '@/components/details/page'

import Trailer from '@/components/trailer'
const page = () => {
  return (
    <div>
  <Moviesection
  title="TITANIC"
  runtime="170 min"
  releaseDate="17 May 2025"
  description="Mature themes and action violence"
  poster="/images/poster.jpg"
  backgroundImage="/images/titanic-hero.jpg"
/>
 
      <Filter
     
  dates={[
    { day: "Thu", date: "19",  },
    { day: "Fri", date: "20" },
    { day: "Sat", date: "21" },
    { day: "Sun", date: "22" },
    { day: "Mon", date: "23" },
    { day: "Tue", date: "24" },
    { day: "Wed", date: "25" },
    { day: "Thu", date: "26" },
  ]}
  filters={["After 5 PM", "Recliners", "3D"]}
  onDateSelect={(date, index) => console.log("Selected Date:", date)}
  onWatchNow={() => alert("Start Watching!")}
/>
 
      <Details event={{}} selectedDate={{}} />
      <Trailer images={[]} />

    </div>
  )
}
 
export default page