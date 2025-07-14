import React from 'react'
import HeroSection from '../Herosection';
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
  return (
    <div>
      <HeroSection  movies={movieCards}/>
    </div>
  )
}

export default Hero
