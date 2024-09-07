import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './MainPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
