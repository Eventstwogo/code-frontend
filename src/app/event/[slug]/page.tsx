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

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

const EventDetailPage = ({ params }: EventDetailPageProps) => {
  const { slug } = params; // ✅ use directly from props (not useParams)
  const [event, setEvent] = useState<any>(null);

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/events/slug/${slug}`);
      setEvent(response.data.data);
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

  return (
    <div>
      <Moviesection
        title={event.event_title}
        runtime="170 min"
        releaseDate="17 May 2025"
        description={event?.extra_data?.description}
        poster={event.card_image}
        backgroundImage={event.banner_image}
      />

      <Filter
        dates={[
          { day: "Thu", date: "19" },
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

      <Details event={event} />
      <Trailer  images={event.event_extra_images}/>
    </div>
  );
};

export default EventDetailPage;
