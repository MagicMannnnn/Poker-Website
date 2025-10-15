import React, { useState } from 'react'

type Props = {
  onBet: (amount: number) => void
  onCheck: () => void
  onFold: () => void
  step?: number
  max?: number
}

export default function BetControls({ onBet, onCheck, onFold, step = 10 }: Props) {
  const [bet, setBet] = useState<number>(step)
  const [tmpBet, setTmpBet] = useState<number>(bet)

  return (
    <div className="controls">
      <div className="bet-size">
        <input style={{minWidth:80, textAlign:'center'}} type="number" step={step} value={tmpBet == 0 ? "" : tmpBet} onChange={val => setTmpBet(Number(val.currentTarget.value))} onBlur={() => {  const rounded = Math.round(tmpBet / 10) * 10; setBet(rounded);setTmpBet(rounded);}}/>
      </div>
      <button onClick={() => onBet(bet)} className="btn">Raise</button>
      <button onClick={onCheck} className="btn ghost">Check / Call</button>
      <button onClick={onFold} className="btn ghost">Fold</button>
    </div>
  )
}
