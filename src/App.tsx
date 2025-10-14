import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameRoom from './pages/GameRoom'
import './styles/globals.css'

export default function App() {
  return (
    <div className="app-root full-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameRoom />} />
      </Routes>
    </div>
  )
}
