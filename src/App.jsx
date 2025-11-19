// src/App.jsx
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

import { AppRoutes } from './routes/AppRoutes.jsx'
import { Login } from './routes/Login.jsx'
import { Home } from './routes/Home.jsx'
import { Account } from './routes/Account.jsx'
import { Progress } from './routes/Progress.jsx'
import { AreaDetail } from './routes/AreaDetail.jsx'

function isAuthenticated(){
  return !!localStorage.getItem('sd_token')
}

function App(){
  const [auth, setAuth] = useState(isAuthenticated())

  useEffect(() => {
    const handleStorage = (event) => {
      if(event.key === 'sd_token'){
        setAuth(!!event.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  function handleAuthSuccess(){
    setAuth(true)
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Tela de login ocupa a tela inteira, sem header/nav */}
          <Route
            path="/"
            element={
              auth
                ? <Navigate to="/home" replace />
                : <Login onAuth={handleAuthSuccess} />
            }
          />

          {/* Área autenticada com layout AppRoutes */}
          <Route
            element={
              auth
                ? <AppRoutes />
                : <Navigate to="/" replace />
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/conta" element={<Account />} />
            <Route path="/progresso" element={<Progress />} />
            <Route path="/progresso/:areaSlug" element={<AreaDetail />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to={auth ? '/home' : '/'} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
