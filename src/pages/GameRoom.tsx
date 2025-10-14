// src/pages/GameRoom.tsx (only the effects changed)
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useGame } from '../context/GameContext'
import Table from '../components/Table'
import BetControls from '../components/BetControls'
import Button from '../components/Button'
import { useWebSocket } from '../hooks/useWebSocket'

export default function GameRoom() {
  const { username, gameCode, isHost } = useUser()
  const { players, pot, board, gamePhase, startGame, placeBet, fold, check, yourId, currentTurnId } = useGame()
  const ws = useWebSocket(import.meta.env.DEV?"ws://localhost:5000/ws":"wss://furious.george.richmnd.uk/ws")
  const navigate = useNavigate()

  useEffect(() => {
    ws.connect?.(import.meta.env.DEV?"ws://localhost:5000/ws":"wss://furious.george.richmnd.uk/ws")
    return () => ws.disconnect?.()
  }, [])

  useEffect(() => {
    if (!username) navigate('/')
  }, [username])

  // 🔑 Send host/join only after socket connects (and retry quickly once)
  useEffect(() => {
    const hello = () => {
      if (!username || !gameCode) return
      if (isHost) ws.hostGame(gameCode, username)
      else ws.joinGame(gameCode, username)
    }
    ws.on('connect', hello)
    const t = setTimeout(hello, 200) // handles the case where 'open' fired before attached
    return () => { ws.off('connect', hello); clearTimeout(t) }
  }, [ws, username, gameCode, isHost])

  const isYourTurn = currentTurnId && yourId === currentTurnId
  const isLobby = gamePhase === 'lobby'

  return (
    <div className="container" style={{ width: 'min(96vw, 1700px)' }}>
      <div className="topbar">
        <div>
          <strong>{username}</strong> <span style={{ color: 'var(--muted)' }}>— {gameCode || 'no-code'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ color: 'var(--muted)' }}>Pot: {pot}</div>
          {isHost && isLobby && (<Button onClick={() => startGame()}>Start Game</Button>)}
        </div>
      </div>

      <Table players={players} yourId={yourId} currentTurnId={currentTurnId} pot={pot} board={board}/>

      <div style={{ marginTop:14, display:'flex', justifyContent:'center', alignItems:'center', gap:12, flexDirection:'column' }}>
        {isLobby && (
          <>
            <div style={{ color:'var(--muted)', textAlign:'center' }}>
              {players.length <= 1
                ? <>Waiting for other players to join...<br/>Share code <b>{gameCode}</b>.</>
                : <>{players.length} players connected. {isHost ? 'You can start the game.' : 'Waiting for host to start the game.'}</>}
            </div>
            {players.length > 0 && (
              <div style={{ color:'var(--white)' }}>
                Players: {players.map(p => (p.id === yourId ? `${p.name} (you)` : p.name)).join(', ')}
              </div>
            )}
          </>
        )}

        {gamePhase === 'inProgress' && (
          <>
            <div style={{ color: isYourTurn ? 'var(--accent)' : 'var(--muted)', fontWeight:700 }}>
              {isYourTurn ? 'Your turn' : `${players.find(p => p.id === currentTurnId)?.name ?? 'Waiting'}'s turn`}
            </div>
            <BetControls onBet={placeBet} onCheck={check} onFold={fold} step={10} />
          </>
        )}
      </div>
    </div>
  )
}
