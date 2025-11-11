import React from 'react'
import { PieScore } from '../components/PieScore.jsx'
import { AreaCard } from '../components/AreaCard.jsx'

export function Home(){
  // dados fictícios
  const score = 78
  const areas = [
    { name:'Rotina de horário', value:18, desc:'horas de dormir/acordar consistentes reduzem latência e despertares.' },
    { name:'Higiene digital', value:12, desc:'diminuir tela 60–90 min antes melhora a produção de melatonina.' },
    { name:'Cafeína', value:11, desc:'evitar cafeína 6–8h antes do sono reduz latência.' },
    { name:'Exercício', value:10, desc:'treinar até 3–6h antes do sono favorece pressão de sono.' },
    { name:'Ambiente', value:9,  desc:'quarto a 18–21°C, pouca luz e ruído estável.' },
    { name:'Hidratação', value:8,  desc:'hidratar-se cedo evita acordar para urinar.' },
    { name:'Álcool', value:14, desc:'reduzir álcool noturno diminui fragmentação do sono.' },
    { name:'Cochilos', value:10, desc:'cochilos curtos (<20min) e antes das 16h ajudam a regular.' },
    { name:'Rotina pré-sono', value:8,  desc:'ritual de 20 min sinaliza desaceleração ao cérebro.' },
  ]

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
