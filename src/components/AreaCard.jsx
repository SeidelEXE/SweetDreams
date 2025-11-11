import React from 'react'
import { ProgressBar } from './ProgressPizza.jsx'

export function AreaCard({ title, desc, value }){
  return (
    <section className="card">
      <div className="metric-title">
        <span>{title}</span>
        <small>{value}%</small>
      </div>
      <p style={{margin:'6px 0 12px', color:'var(--muted)', fontSize:13, lineHeight:1.35}}>
        {desc}
      </p>
      <ProgressBar value={value} ariaLabel={title}/>
    </section>
  )
}
