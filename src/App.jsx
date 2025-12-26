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
import { ConnectPage } from './pages/Connect.jsx'
import  { StartupDetail } from './pages/IndividualStartups.jsx'
import AdminDashboard from './pages/Admin.jsx'
import { AdminRoute } from './components/AdminRoute.jsx'
import { MyBlogsPage } from './pages/MyBlogsPage.jsx'
import { CreateBlogPage } from './pages/CreateBlogPage.jsx'
import ProfilePage from './pages/Profile.jsx'
import ContactPage from './pages/ContactUs.jsx'
const App = () => {
  return (
    <div>
    
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/startups" element={<StartupsPage />} />
          <Route path="/startup/:id" element={ <StartupDetail /> } />  // TODO: Create Startup Detail Page
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/my-blogs" element={<MyBlogsPage />} />
          <Route path="/blog/create" element={<CreateBlogPage />} />
          <Route path="/blog/edit/:id" element={<CreateBlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={ <AdminRoute>
                                            <AdminDashboard />
                                          </AdminRoute>} />
        </Routes>
        <Footer />
     
    </div>
  )
}

export default App