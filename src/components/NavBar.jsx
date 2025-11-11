import React from 'react'
import { NavLink } from 'react-router-dom'

const link = ({ isActive }) => 'navlink ' + (isActive ? 'active' : '')

export function NavBar(){
  return (
    <nav className="header nav" aria-label="menu primário">
      <NavLink to="/" className={({isActive})=> isActive ? 'active' : ''}>Início</NavLink>
      <NavLink to="/progresso" className={({isActive})=> isActive ? 'active' : ''}>Áreas & Progresso</NavLink>
      <NavLink to="/conta" className={({isActive})=> isActive ? 'active' : ''}>Conta</NavLink>
      <NavLink to="/plano" className={({isActive})=> isActive ? 'active' : ''}>Plano de Assinatura</NavLink>
      <button onClick={()=>alert('Pesquisar em breve')}>Pesquisar</button>
      <button onClick={()=>alert('Configurações em breve')}>Configurações</button>
    </nav>
  )
}
