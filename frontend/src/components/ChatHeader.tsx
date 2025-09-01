'use client'

import { useChat } from '@/contexts/ChatContext'
import { ThemeToggle } from './ThemeToggle'
import { Trash2, Bot } from 'lucide-react'

export function ChatHeader() {
  const { clearChat, sessionId } = useChat()

  const handleClearChat = () => {
    if (confirm('¿Estás seguro de que quieres limpiar toda la conversación?')) {
      clearChat()
    }
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Jarvis
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Asistente de investigación
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block" suppressHydrationWarning>
            Sesión: {sessionId.slice(0, 8)}...
          </div>
          
          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Limpiar conversación"
          >
            <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
