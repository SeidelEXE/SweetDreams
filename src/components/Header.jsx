import React from 'react'
import { ThemeToggle } from './ThemeToggle.jsx'

function greet(){
  const h = new Date().getHours()
  if(h >= 5 && h < 12) return 'Bom dia'
  if(h >= 12 && h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function Header(){
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-badge">SD</div>
        <div>
          <div>Sweet Dreams</div>
          <small style={{color:'var(--muted)'}}>{greet()} Seidel</small>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <div style={{opacity:.8,fontSize:12}}>MVP • v0.1</div>
        <ThemeToggle />
      </div>
    </header>
  )
}
