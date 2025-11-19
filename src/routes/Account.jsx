import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { sleepAreas } from '../data/sleepAreas.js'

export function Account(){
  const location = useLocation()
  const displayName = typeof window !== 'undefined'
    ? localStorage.getItem('sd_user_name') || 'Sweet User'
    : 'Sweet User'
  const email = typeof window !== 'undefined'
    ? localStorage.getItem('sd_user_email') || 'seidel@example.com'
    : 'seidel@example.com'
  const timezone = 'America/Sao_Paulo'

  const focusAreas = sleepAreas.slice(0, 3)

  const settings = [
    { label: 'Notificações push', desc: 'Lembretes de rotina do sono e check-ins diários.', status: 'Ativado' },
    { label: 'Tema do app', desc: 'Escolha entre claro/escuro ou automático pelo sistema.', status: 'Escuro' },
    { label: 'Conexão com dispositivos', desc: 'Apple Health, Google Fit e relógios suportados.', status: 'Watch + Phone' },
    { label: 'Privacidade dos dados', desc: 'Controle quem pode ver tendências e relatórios.', status: 'Somente eu' }
  ]

  useEffect(() => {
    if(location.hash === '#account-config'){
      const el = document.getElementById('account-config')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <section className="card account-page">
      <header className="progress-header">
        <div>
          <h2>Conta</h2>
          <p className="help">Gerencie seu perfil e suas preferências</p>
        </div>
      </header>

      <div className="account-section">
        <h3>Perfil</h3>
        <div className="account-info">
          <div>
            <span className="help">Nome</span>
            <p>{displayName}</p>
          </div>
          <div>
            <span className="help">E-mail</span>
            <p>{email}</p>
          </div>
          <div>
            <span className="help">Fuso horário preferido</span>
            <p>{timezone.replace('_',' ')}</p>
          </div>
        </div>
      </div>

      <div className="account-section">
        <h3>Áreas em foco</h3>
        <div className="focus-list">
          {focusAreas.map(area => (
            <div key={area.slug} className="focus-card">
              <div>
                <strong>{area.name}</strong>
                <p className="help">{area.summary}</p>
              </div>
              <span>{area.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="account-section" id="account-config">
        <div className="account-section__header">
          <h3>Configurações de conta</h3>
          <p className="help">Preferências e privacidade</p>
        </div>
        <div className="settings-list">
          {settings.map(item => (
            <div key={item.label} className="settings-card">
              <div>
                <strong>{item.label}</strong>
                <p>{item.desc}</p>
              </div>
              <div className="settings-card__action">
                <span>{item.status}</span>
                <button onClick={()=>alert(`Editar ${item.label}`)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
