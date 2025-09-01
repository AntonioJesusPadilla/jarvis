'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

interface ChatContextType {
  sessionId: string
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => uuidv4())
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    }

    const loadingMessage: Message = {
      id: uuidv4(),
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          chatInput: content
        })
      })

      const data = await response.json()

      if (data.status === 'success') {
        const assistantMessage: Message = {
          id: uuidv4(),
          content: data.n8n_response?.output || data.n8n_response?.message || 'Respuesta recibida correctamente',
          sender: 'assistant',
          timestamp: new Date()
        }

        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = assistantMessage
          return newMessages
        })
      } else {
        const errorMessage: Message = {
          id: uuidv4(),
          content: `Error: ${data.message}`,
          sender: 'assistant',
          timestamp: new Date()
        }

        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = errorMessage
          return newMessages
        })
      }
    } catch {
      const errorMessage: Message = {
        id: uuidv4(),
        content: 'Error de conexión. Asegúrate de que el backend esté ejecutándose en http://localhost:8000',
        sender: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = errorMessage
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }, [sessionId])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <ChatContext.Provider value={{
      sessionId,
      messages,
      isLoading,
      sendMessage,
      clearChat
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
