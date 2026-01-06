import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('Service Worker registration failed', err))
  })
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)