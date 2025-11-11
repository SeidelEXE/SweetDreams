import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import App from '../App.jsx'
import { Home } from './Home.jsx'
import { Account } from './Account.jsx'
import { Progress } from './Progress.jsx'
import { Plan } from './Plan.jsx'

export function AppRoutes(){
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conta" element={<Account />} />
          <Route path="/progresso" element={<Progress />} />
          <Route path="/plano" element={<Plan />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </App>
    </BrowserRouter>
  )
}
