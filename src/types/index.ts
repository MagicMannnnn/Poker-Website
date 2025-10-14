export type Player = {
  id: string
  name: string
  money: number
  betAmount: number
  isHost?: boolean
  isActive?: boolean
  isTurn?: boolean
  hand?: string[]
}

export type GamePhase = 'lobby' | 'inProgress' | 'showdown' | 'finished'
