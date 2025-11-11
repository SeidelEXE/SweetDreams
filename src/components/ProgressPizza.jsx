import React from 'react'

export function ProgressBar({ value = 0, ariaLabel }){
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={ariaLabel}>
      <span style={{ width: pct + '%' }} />
    </div>
  )
}
