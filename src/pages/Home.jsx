import React from 'react'
import { HeroSection } from '../components/HeroSection'

import TrustedBySection from '../components/TrustedBySection'
import BookShowcaseSection from '../components/BookShowcasing'
import { FeaturedStartups } from '../components/FeaturedStartup'

const Home = () => {
  return (
    <div>
      <HeroSection onNavigate={(section) => console.log(`Navigate to ${section}`)} />
      <TrustedBySection/>
      <BookShowcaseSection/>
      <FeaturedStartups/>
      
    </div>
  )
}

export default Home