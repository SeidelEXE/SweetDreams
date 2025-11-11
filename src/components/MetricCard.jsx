import React from 'react'
import { ProgressBar } from './ProgressPizza.jsx'

export function MetricCard({ title, hint, value }){
  return (
    <section className="card">
      <div className="metric-title">
        <span>{title}</span>
        <small>{hint}</small>
      </div>
      <ProgressBar value={value} ariaLabel={title}/>
    </section>
  )
}
