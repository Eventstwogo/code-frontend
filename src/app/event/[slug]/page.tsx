// /event/[slug]/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Moviesection from '@/components/moviesection';
import Filter from '@/components/filter/page';
import Details from '@/components/details/page';
import Trailer from '@/components/trailer';
import axiosInstance from '@/lib/axiosInstance';
import { useParams } from 'next/navigation';
import KangarooLoader from '@/components/ui/kangaroo';

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
      const response = await axiosInstance.get(`/api/v1/new-events/slug/${slug}`);
      const eventData = response.data.data;
      setEvent(eventData);
      
      // Generate dates from the event data
    if (eventData.event_dates) {
  const dates = eventData.event_dates
console.log(dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore time



  setEventDates(dates);

  if (dates.length > 0) {
    setSelectedDate(dates[0]);
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

  if (!event) return <p><KangarooLoader/></p>;


  return (
    <div className="min-h-screen bg-gray-50">
      <Moviesection
        title={event.event_title}
        runtime="170 min"
        releaseDate={event.event_dates[0] || ''}
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
