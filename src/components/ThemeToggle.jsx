import React from 'react'
import { useTheme } from '../contexts/ThemeContext.jsx'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '4px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        color: 'var(--muted)'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'var(--bg-1)'
        e.target.style.color = 'var(--ink)'
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'none'
        e.target.style.color = 'var(--muted)'
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
