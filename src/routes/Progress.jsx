import React from 'react'
import { useNavigate } from 'react-router-dom'
import { sleepAreas } from '../data/sleepAreas.js'

export function Progress(){
  const nav = useNavigate()

  return (
    <section className="card">
      <header className="progress-header">
        <div>
          <h2>Áreas & Progresso</h2>
          <p className="help">Edite e mantenha as áreas do seu sono</p>
        </div>
      </header>

      <div className="area-list">
        {sleepAreas.map(area => (
          <button
            key={area.slug}
            className="area-item"
            onClick={()=>nav(`/progresso/${area.slug}`)}
          >
            <div className="area-item__content">
              <div>
                <strong>{area.name}</strong>
                <p>{area.summary}</p>
              </div>
              <span className="area-item__value">{area.value}%</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
