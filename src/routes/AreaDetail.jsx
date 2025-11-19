import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sleepAreas } from '../data/sleepAreas.js'

export function AreaDetail(){
  const { areaSlug } = useParams()
  const nav = useNavigate()

  const area = sleepAreas.find(item => item.slug === areaSlug)

  if(!area){
    return (
      <section className="card">
        <p className="help">Área não encontrada.</p>
        <button className="btn" style={{maxWidth:220}} onClick={()=>nav('/progresso')}>
          Voltar para a lista
        </button>
      </section>
    )
  }

  return (
    <section className="card area-detail">
      <button className="back-chip" onClick={()=>nav(-1)}>
        ← Voltar
      </button>

      <h2>{area.name}</h2>
      <p className="help">{area.summary}</p>

      <div className="area-detail__score">
        <span>Score atual</span>
        <strong>{area.value}%</strong>
      </div>

      <p>{area.detail}</p>

      <div className="area-detail__actions">
        {area.actions.map(action => (
          <div key={action} className="area-detail__card">
            <p>{action}</p>
            <button onClick={()=>alert(`Ação: ${action}`)}>Configurar</button>
          </div>
        ))}
      </div>
    </section>
  )
}
