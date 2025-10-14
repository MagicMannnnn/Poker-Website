import React from 'react'

export default function CardHand({ cards = [] }: { cards?: string[] }) {
  return (
    <div style={{ display:'flex', gap:8 }}>
      {cards.length === 0 && <div style={{ color:'var(--muted)' }}>No cards</div>}
      {cards.map((c, i) => (
        <div key={i} className="player-card" style={{ padding:'6px 10px' }}>{c}</div>
      ))}
    </div>
  )
}
