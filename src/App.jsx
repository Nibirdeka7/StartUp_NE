import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Footer } from './components/Footer.jsx'
import { AboutPage } from './pages/AboutUs.jsx'
import { ServicesPage } from './pages/Services.jsx'
import { StartupsPage } from './pages/Startups.jsx'
import { BlogPage } from './pages/BlogPage.jsx'
import { BlogPostPage } from './pages/BlogPagePost.jsx'
const App = () => {
  return (
    <div>
    
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/startup" element={<StartupsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
        <Footer />
     
    </div>
  )
}

export default App