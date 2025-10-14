// src/pages/Home.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useUser } from '../context/UserContext'

export default function Home() {
  const { username, setUsername, gameCode, setGameCode, setIsHost } = useUser()
  const navigate = useNavigate()

  const host = () => {
    if (!username) return alert('Please enter a username')
    if (!gameCode) return alert('Please enter a game code')
    setIsHost(true)
    navigate('/game')
  }

  const join = () => {
    if (!username) return alert('Please enter a username')
    if (!gameCode) return alert('Please enter a game code')
    setIsHost(false)
    navigate('/game')
  }

  return (
    <div className="container">
      <div style={{ display:'grid', gap:14, maxWidth:560, margin:'0 auto' }}>
        <h1 style={{ margin:0 }}>Welcome to Poker</h1>
        <p style={{ color:'var(--muted)' }}>Enter a username and game code to host or join.</p>
        <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Your name" />
        <InputField label="Game Code" value={gameCode} onChange={e => setGameCode(e.target.value)} placeholder="ABCD" />
        <div style={{ display:'flex', gap:10 }}>
          <Button onClick={host}>Host Game</Button>
          <Button className="ghost" onClick={join}>Join Game</Button>
        </div>
      </div>
    </div>
  )
}
