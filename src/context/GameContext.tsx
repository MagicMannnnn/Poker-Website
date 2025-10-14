import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Player, GamePhase } from '../types'
import * as socket from '../services/socket'

type GameContextType = {
  players: Player[]
  yourId: string | null
  pot: number
  startingMoney: number
  board: string[]
  currentBet: number
  gamePhase: GamePhase
  currentTurnId: string | null
  startGame: () => void
  placeBet: (amount: number) => void
  fold: () => void
  check: () => void
  hostGame: (code: string, username: string) => void
  joinGame: (code: string, username: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [yourId, setYourId] = useState<string | null>(null)
  const [pot, setPot] = useState<number>(0)
  const startingMoney = 1000
  const [gamePhase, setGamePhase] = useState<GamePhase>('lobby')
  const [currentTurnId, setCurrentTurnId] = useState<string | null>(null)
  const [board, setBoard] = useState<string[]>([])
  const [currentBet, setCurrentBet] = useState<number>(0);

  useEffect(() => {
    function onPlayerList(msg:any){
      console.log(msg);
      setPlayers(msg.players || [])
      if (msg.youId) setYourId(msg.youId)
    }
    function onGameStarted(){ setGamePhase('inProgress') }
    function onDeal(msg:any){
      //setPlayers(prev => prev.map(p => ({ ...p, hand: msg.hands?.[p.id] || p.hand })))
      setPot(msg.pot ?? 0)
      setBoard(msg.board);
    }
    function onYourTurn(msg:any){ setCurrentTurnId(msg.playerId) }
    function onUpdate(msg:any){
      if (msg.players) setPlayers(msg.players)
      if (typeof msg.pot === 'number') setPot(msg.pot)
      if (msg.gamePhase) setGamePhase(msg.gamePhase)
      if (msg.currentBet) setCurrentBet(msg.currentBet);
    }

    socket.on('playerList', onPlayerList)
    socket.on('gameStarted', onGameStarted)
    socket.on('deal', onDeal)
    socket.on('yourTurn', onYourTurn)
    socket.on('update', onUpdate)
    return () => {
      socket.off('playerList', onPlayerList)
      socket.off('gameStarted', onGameStarted)
      socket.off('deal', onDeal)
      socket.off('yourTurn', onYourTurn)
      socket.off('update', onUpdate)
    }
  }, [])

  const startGame = () => socket.startGame()
  const placeBet = (amount:number) => socket.sendBet(amount)
  const fold = () => socket.fold()
  const check = () => socket.check()
  const hostGame = (code:string, username:string) => socket.hostGame(code, username)
  const joinGame = (code:string, username:string) => socket.joinGame(code, username)

  return (
    <GameContext.Provider value={{ players, yourId, pot, startingMoney, board, currentBet, gamePhase, currentTurnId, startGame, placeBet, fold, check, hostGame, joinGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame(){
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
