import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App