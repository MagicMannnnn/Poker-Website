import React from 'react'

type Props = {
  player: any
  isYou?: boolean
  isTurn?: boolean
  cardBackSrc?: string
  betAmount?: number
}

export default function PlayerSeat({ player, isYou, isTurn, cardBackSrc = '/cards/card_back.png' }: Props) {

  var c0 = cardBackSrc;
  var c1 = cardBackSrc;
  if (isYou) {
    c0 = player.hand?.[0] ? `/cards/${player.hand[0]}.png` : cardBackSrc
    c1 = player.hand?.[1] ? `/cards/${player.hand[1]}.png` : cardBackSrc
  }
  

  return (
    <div className={'seat' + (isTurn ? ' turn' : '')}>
      <div className="name">
        {player.name} {player.isHost ? ' (host)' : ''}{isYou ? ' • you' : ''} £{player.money}
      </div>
      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
        <img src={c0} alt="card" style={{ width:64, height:92, borderRadius:8 }} />
        <img src={c1} alt="card" style={{ width:64, height:92, borderRadius:8 }} />
      </div>
      <div className="stack">{player.betAmount ?? 0}</div>
    </div>
  )
}
