import { useEffect } from 'react'
import * as socket from '../services/socket'

export function useWebSocket(url?: string) {
  useEffect(() => {
    if (url) socket.connect(url)
    return () => socket.disconnect()
  }, [url])

  return {
    connect: socket.connect,
    disconnect: socket.disconnect,
    on: socket.on,
    off: socket.off,
    hostGame: socket.hostGame,
    joinGame: socket.joinGame,
    startGame: socket.startGame,
    sendBet: socket.sendBet,
    raise: socket.raise,
    fold: socket.fold,
    check: socket.check
  }
}
