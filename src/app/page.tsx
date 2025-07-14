
import React from 'react'
import Hero from '@/components/homepage/Hero'
import Carousel from '@/components/categoriesScroll'
import Trending from '@/components/Trending'
import MovieGrid from '@/components/homepage/Movies'
import Sports from '@/components/homepage/sports'
import EventCard from '@/components/Events'
import Horizantalcard from '@/components/Ads'
import Offers from '@/components/Rewards'
import image from '../../public/images/ads.png'


const page = () => {
return (
    <div>

<Hero/>
<Carousel/>
<Trending/>
<Horizantalcard image={image}/>
<MovieGrid/>
<Horizantalcard image={image}/>
<EventCard/>
<Horizantalcard image={image}/>
<Sports/>
<Horizantalcard image={image}/>
<Offers/>

    </div>
  )
}

export default page
