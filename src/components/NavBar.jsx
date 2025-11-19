import React from 'react'
import { NavLink } from 'react-router-dom'

export function NavBar({ onNavigate = () => {} }){
  return (
    <nav className="header nav" aria-label="menu primário">
      <NavLink to="/" className={({isActive})=> isActive ? 'active' : ''} onClick={onNavigate}>Início</NavLink>
      <NavLink to="/progresso" className={({isActive})=> isActive ? 'active' : ''} onClick={onNavigate}>Áreas & Progresso</NavLink>
      <NavLink to="/conta" className={({isActive})=> isActive ? 'active' : ''} onClick={onNavigate}>Conta</NavLink>
      <button onClick={()=>{ onNavigate(); alert('Pesquisar em breve') }}>Pesquisar</button>
      <button onClick={()=>{ onNavigate(); window.location.href = '/conta#account-config' }}>Configurações</button>
      <button onClick={() => { onNavigate(); localStorage.removeItem('sd_token'); location.href='/' }}>
        Sair
      </button>

    </nav>
  )
}
