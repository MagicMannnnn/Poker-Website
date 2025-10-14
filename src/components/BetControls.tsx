import React, { useState } from 'react'

type Props = {
  onBet: (amount: number) => void
  onCheck: () => void
  onFold: () => void
  step?: number
  max?: number
}

export default function BetControls({ onBet, onCheck, onFold, step = 10, max = 1000 }: Props) {
  const [bet, setBet] = useState<number>(step)
  const inc = () => setBet(b => Math.min(max, b + step))
  const dec = () => setBet(b => Math.max(step, b - step))

  return (
    <div className="controls">
      <div className="bet-size">
        <button onClick={dec} className="btn ghost" aria-label="Decrease bet">-</button>
        <div style={{minWidth:80, textAlign:'center'}}>{bet}</div>
        <button onClick={inc} className="btn ghost" aria-label="Increase bet">+</button>
      </div>
      <button onClick={() => onBet(bet)} className="btn">Bet / Raise</button>
      <button onClick={onCheck} className="btn ghost">Check / Call</button>
      <button onClick={onFold} className="btn ghost">Fold</button>
    </div>
  )
}
