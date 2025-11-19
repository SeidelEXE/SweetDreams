// src/routes/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login({ onAuth = () => {} }){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setLoading(true)

    if(!email || !pass){
      setError('Informe e-mail e senha.')
      setLoading(false)
      return
    }

    // mock de autenticação
    await new Promise(r => setTimeout(r, 400))

    localStorage.setItem('sd_token', 'demo-token')
    localStorage.setItem('sd_user_name', 'Seidel')
    onAuth()

    setLoading(false)
    nav('/home', { replace: true })
  }

  return (
    <div className="auth-wrap">
      <section className="auth-card">
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18}}>
          <div className="brand-badge">SD</div>
          <div>
            <div style={{fontWeight:800, fontSize:18}}>Sweet Dreams</div>
            <small className="help">Faça login para regular seu sono</small>
          </div>
        </div>

        <form className="row" onSubmit={handleSubmit}>
          <label className="row">
            <span className="help">E-mail</span>
            <input
              className="input"
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </label>

          <label className="row">
            <span className="help">Senha</span>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={e=>setPass(e.target.value)}
            />
          </label>

          {error && (
            <div className="help" style={{color:'var(--bad)'}}>
              {error}
            </div>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="row-2">
            <span className="help">Esqueceu a senha?</span>
            <span className="link" onClick={()=>alert('Recuperação em breve')}>
              Recuperar
            </span>
          </div>
        </form>
      </section>
    </div>
  )
}
