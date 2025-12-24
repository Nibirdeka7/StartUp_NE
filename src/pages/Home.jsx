import React, { useState, useEffect } from 'react'
import { HeroSection } from '../components/HeroSection'
import TrustedBySection from '../components/TrustedBySection'
import BookShowcaseSection from '../components/BookShowcasing'
import { FeaturedStartups } from '../components/FeaturedStartup'
import { ServicesGrid } from '../components/Services'
import { Testimonials } from '../components/Testimonial'
import { AuthModal } from '../components/AuthModal'
import { ListStartupModal } from '../components/ListStartupModal'
import { supabase } from '../utils/supabaseClient'

const Home = () => {
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isListStartupModalOpen, setIsListStartupModalOpen] = useState(false)

  // Monitor Auth State
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  const handleListStartupClick = () => {
    if (!user) {
      setIsAuthModalOpen(true) // Force login if not authenticated
    } else {
      setIsListStartupModalOpen(true)
    }
  }

  const handleNavigate = (section) => {
    console.log(`Navigate to ${section}`)
    // You can add actual navigation logic here if needed
  }

  return (
    <div>
      <HeroSection 
        onNavigate={handleNavigate}
        onListStartupClick={handleListStartupClick}
      />
      {/* <TrustedBySection/> */}
      <BookShowcaseSection/>
      <FeaturedStartups/>
      <ServicesGrid/>
      <Testimonials/>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onListStartup={() => setIsListStartupModalOpen(true)}
        onGoHome={() => handleNavigate("home")}
      />

      <ListStartupModal
        isOpen={isListStartupModalOpen}
        onClose={() => setIsListStartupModalOpen(false)}
      />
    </div>
  )
}

export default Home