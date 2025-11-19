// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/Globals.css'
import './styles/Layout.css'
import './styles/Components.css'

createRoot(document.getElementById('root')).render(<App />)
