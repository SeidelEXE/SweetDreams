import React from 'react'

export function ScoreCard({ score, caption, kpis }){
  return (
    <section className="card score">
      <div className="value">{score}</div>
      <div className="sub">{caption}</div>
      <div className="kpis">
        {kpis.map((k)=>(
          <div key={k.k} className="kpi">
            <div className="k">{k.k}</div>
            <div className="v">{k.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
