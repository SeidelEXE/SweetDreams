// src/routes/AppRoutes.jsx
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'

export function AppRoutes(){
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu(){
    setMenuOpen(open => !open)
  }

  function closeMenu(){
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <div className="container">
        <div className="grid" style={{ gap: '16px' }}>
          <div className="menu-wrapper">
            <Header onMenuToggle={toggleMenu} menuOpen={menuOpen} />
            <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
              <NavBar onNavigate={closeMenu} />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
