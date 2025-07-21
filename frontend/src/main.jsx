import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContextWrapper from './UserContextWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextWrapper>
    <App />
  </UserContextWrapper>,
)
