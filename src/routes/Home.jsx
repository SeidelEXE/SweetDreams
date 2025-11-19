import React from 'react'
import { PieScore } from '../components/PieScore.jsx'
import { AreaCard } from '../components/AreaCard.jsx'
import { sleepAreas } from '../data/sleepAreas.js'

export function Home(){
  const score = sleepAreas.reduce((acc, area) => acc + area.value, 0)
  const areas = sleepAreas.map(a => ({
    name: a.name,
    value: a.value,
    desc: a.summary
  }))

  return (
    <>
      <PieScore
        title="Score de Qualidade do Sono"
        data={areas.map(a=>({name:a.name, value:a.value}))}
        center={String(score)}
      />

      <div className="grid metrics">
        {areas.map(a=>(
          <AreaCard key={a.name} title={a.name} desc={a.desc} value={a.value}/>
        ))}
      </div>
    </>
  )
}
