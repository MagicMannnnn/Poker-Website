import React, { useMemo } from 'react'
import PlayerSeat from './PlayerSeat'
import { Player } from '../types'

type Props = {
  players: Player[]
  yourId?: string | null
  currentTurnId?: string | null
  board?: string[]
  pot?: number
}

export default function Table({ players, yourId, currentTurnId, board = [], pot = 0 }: Props) {
  // circular seat positions around the oval
  const positions = useMemo(() => {
    const n = Math.max(players.length, 2)
    return players.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const rx = 44; // x radius percentage relative to wrap
      const ry = 36; // y radius percentage
      const x = 50 + rx * Math.cos(angle)
      const y = 50 + ry * Math.sin(angle)
      return { x, y }
    })
  }, [players])

  return (
    <div className="table-wrap">
      <div className="table-oval">
        <div className="turn-indicator">Pot: {pot}</div>
        <div className="board">
          {board.length === 0
            ? (<>
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
                <div className="slot" />
              </>)
            : board.map((c, i) => <img key={i} src={`/cards/${c}.png`} alt={c} style={{ width:64, height:92, borderRadius:8 }} />)
          }
        </div>
      </div>
      {players.map((p, i) => (
        <div key={p.id} style={{ position:'absolute', left: positions[i]?.x+'%', top: positions[i]?.y+'%' }}>
          <PlayerSeat player={p} isYou={p.id===yourId} isTurn={p.id===currentTurnId} />
        </div>
      ))}
    </div>
  )
}
