// 'use client'
// import React,{useEffect, useState} from 'react'
// import Moviesection from '@/components/moviesection'
// import Filter from '@/components/filter/page'
// import Details from '@/components/details/page'
// import axiosInstance from '@/lib/axiosInstance'
// import Trailer from '@/components/trailer'
// import { useParams } from 'next/navigation'
// const EventDetailPage = ({ params }: { params: { slug: string } }) => {
//     const { slug } = useParams();
// console.log(slug)
//   const [event,setEvent] =useState([])
//   const fetchEvent=async()=>{
//     try{
//         const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`)
//         setEvent(response.data.data)
//     }
//     catch(error){
//         console.error('Error fetching event:', error);
//     }
//   }
//   useEffect(()=>{fetchEvent()},[])
// console.log(event)
//   return (
//     <div>
//   <Moviesection
//   title={event.event_title}
//   runtime="170 min"
//   releaseDate="17 May 2025"
//   description={event?.extra_data.description}
//   poster={event.card_image}
//   backgroundImage={event.banner_image}
// />
 
//       <Filter
     
//   dates={[
//     { day: "Thu", date: "19",  },
//     { day: "Fri", date: "20" },
//     { day: "Sat", date: "21" },
//     { day: "Sun", date: "22" },
//     { day: "Mon", date: "23" },
//     { day: "Tue", date: "24" },
//     { day: "Wed", date: "25" },
//     { day: "Thu", date: "26" },
//   ]}
//   filters={["After 5 PM", "Recliners", "3D"]}
//   onDateSelect={(date, index) => console.log("Selected Date:", date)}
//   onWatchNow={() => alert("Start Watching!")}
// />
 
//       <Details />
//       <Trailer />

//     </div>
//   )
// }
 
// export default EventDetailPage


// /event/[slug]/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Moviesection from '@/components/moviesection';
import Filter from '@/components/filter/page';
import Details from '@/components/details/page';
import Trailer from '@/components/trailer';
import axiosInstance from '@/lib/axiosInstance';
import { useParams } from 'next/navigation';

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

type DateItem = {
  day: string;
  date: string;
};

const EventDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [event, setEvent] = useState<any>(null);
  const [eventDates, setEventDates] = useState<DateItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateItem | null>(null);

  const generateEventDates = (startDate: string, endDate: string): DateItem[] => {
    const dates: DateItem[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // If start and end dates are the same, show only that single date
    if (start.getTime() === end.getTime()) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = dayNames[start.getDay()];
      const date = start.getDate().toString();
      
      dates.push({ day, date });
    } else {
      // If different dates, generate dates between start and end
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = dayNames[currentDate.getDay()];
        const date = currentDate.getDate().toString();
        
        dates.push({ day, date });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dates;
  };

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`);
      const eventData = response.data.data;
      setEvent(eventData);
      
      // Generate dates from the event data
    if (eventData.start_date && eventData.end_date) {
  const dates = generateEventDates(eventData.start_date, eventData.end_date);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore time

  const futureDates = dates.filter(d => {
    // Create a date for the event date using the same month/year from start_date
    const eventDate = new Date(eventData.start_date);
    eventDate.setDate(parseInt(d.date));
    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= today;
  });

  setEventDates(futureDates);

  if (futureDates.length > 0) {
    setSelectedDate(futureDates[0]);
  }
}

    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  if (!event) return <p>Loading...</p>;

console.log(eventDates);
  return (
    <div className="min-h-screen bg-gray-50">
      <Moviesection
        title={event.event_title}
        runtime="170 min"
        releaseDate={event.start_date || ''}
        description={event?.extra_data?.description}
        poster={event.card_image}
        backgroundImage={event.banner_image}
        location={event.extra_data?.address}
      />

      <div className="bg-white">
        <Filter
          dates={eventDates}
          filters={["After 5 PM", "Recliners", "3D"]}
          onDateSelect={(date, index) => {
            console.log("Selected Date:", date);
            setSelectedDate(date);
          }}
          onWatchNow={() => alert("Start Watching!")}
        />
      </div>

      <div className="bg-gray-50">
        <Details event={event} selectedDate={selectedDate} />
      </div>
      
      <div className="bg-white">
        <Trailer images={event.event_extra_images}/>
      </div>
    </div>
  );
};

export default EventDetailPage;
