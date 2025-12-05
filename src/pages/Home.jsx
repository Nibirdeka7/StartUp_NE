import React from 'react'
import { HeroSection } from '../components/HeroSection'

import TrustedBySection from '../components/TrustedBySection'
import BookShowcaseSection from '../components/BookShowcasing'
import { FeaturedStartups } from '../components/FeaturedStartup'
import { ServicesGrid } from '../components/Services'
import { Testimonials } from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <HeroSection onNavigate={(section) => console.log(`Navigate to ${section}`)} />
      <TrustedBySection/>
      <BookShowcaseSection/>
      <FeaturedStartups/>
      <ServicesGrid/>
      <Testimonials/>
    </div>
  )
}

export default Home