import React, { createContext, useContext, useState, ReactNode } from 'react'

type UserContextType = {
  username: string
  setUsername: (s: string) => void
  gameCode: string
  setGameCode: (s: string) => void
  isHost: boolean
  setIsHost: (b: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('')
  const [gameCode, setGameCode] = useState<string>('')
  const [isHost, setIsHost] = useState<boolean>(false)

  return (
    <UserContext.Provider value={{ username, setUsername, gameCode, setGameCode, isHost, setIsHost }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(){
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
