'use client'

import { useEffect, useRef } from 'react'
import { useChat } from '@/contexts/ChatContext'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

export function ChatContainer() {
  const { messages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="max-w-md mx-auto px-4">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                ¡Hola! Soy Jarvis
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tu asistente de investigación inteligente. Puedo ayudarte a encontrar información, 
                responder preguntas y realizar investigaciones detalladas.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Escribe tu pregunta abajo para comenzar.
              </p>
            </div>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input de chat */}
      <ChatInput />
    </div>
  )
}
