import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#7fa2ff','#8592e0','#b7a8e3','#5fc9a6','#f2c14e','#ef6b73','#a8b2d1','#233056','#151d33']

export function PieScore({ title='Qualidade do Sono', data=[], center='78' }){
  return (
    <section className="card">
      <div className="metric-title">
        <span>{title}</span>
        <small>distribuição por áreas</small>
      </div>

      <div style={{width:'100%', height:260, position:'relative'}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              stroke="#0f1423"
              strokeWidth={1}
            >
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip
              contentStyle={{
                background:'var(--card)',
                border:'1px solid var(--track)',
                borderRadius:8,
                color:'var(--ink)'
              }}
              itemStyle={{color:'var(--ink)'}}
            />
          </PieChart>
        </ResponsiveContainer>

        <div style={{
          position:'absolute', inset:0, display:'grid', placeItems:'center',
          fontWeight:800, fontSize:32, color:'var(--ink)'
        }}>
          {center}
        </div>
      </div>
    </section>
  )
}
