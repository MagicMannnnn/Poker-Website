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
  const [tmpBet, setTmpBet] = useState<number>(bet)
  const inc = () => {setBet(b => Math.min(max, b + step)); setTmpBet(bet)}
  const dec = () => {setBet(b => Math.max(step, b - step)); setTmpBet(bet)}

  return (
    <div className="controls">
      <div className="bet-size">
        <button onClick={dec} className="btn ghost" aria-label="Decrease bet">-</button>
        <input style={{minWidth:80, textAlign:'center'}} type="number" step={step} value={tmpBet} onChange={val => setTmpBet(Number(val.currentTarget.value))} onBlur={() => {  const rounded = Math.round(tmpBet / 10) * 10; setBet(rounded);setTmpBet(rounded);}}/>
        <button onClick={inc} className="btn ghost" aria-label="Increase bet">+</button>
      </div>
      <button onClick={() => onBet(bet)} className="btn">Bet / Raise</button>
      <button onClick={onCheck} className="btn ghost">Check / Call</button>
      <button onClick={onFold} className="btn ghost">Fold</button>
    </div>
  )
}
