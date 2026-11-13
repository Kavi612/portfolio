import { useEffect, useRef, useState } from 'react'
import { Bot, MessageSquare, Send, Sparkles, X } from 'lucide-react'

const SUGGESTIONS = [
  'What has Kavi built with AI?',
  'Tell me about FarmCredit AI',
  "What's his AWS experience?",
  'Is he open to relocation?',
]

export default function AskKavi() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMac, setIsMac] = useState(false)

  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Detect platform for shortcut badge (⌘K vs Ctrl K)
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || ''))
    }
  }, [])

  // Keyboard shortcut listener (Ctrl/Cmd + K, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input whenever the modal is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 80)
    }
  }, [isOpen])

  // Auto-scroll to bottom of chat when new messages or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, isOpen])

  const sendMessage = async (textToSend) => {
    const text = (textToSend || input).trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    // Prepare message history (last 6 messages)
    const historyPayload = updatedMessages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const res = await fetch('/api/ask-kavi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload }),
      })

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`)
      }

      const data = await res.json()
      if (!data.reply) {
        throw new Error('No reply in response')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I couldn't reach the assistant just now. Try again in a moment, or use the contact section.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Pill Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="kv-ask-trigger"
        aria-label="Open Ask Kavi AI assistant"
      >
        <span className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-light" />
          <span>Ask Kavi</span>
        </span>
        <kbd className="kv-kbd-hint">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>

      {/* Backdrop & Modal */}
      <div
        className={`kv-ask-backdrop ${isOpen ? 'kv-open' : ''}`}
        onClick={() => setIsOpen(false)}
        role="presentation"
      >
        <div
          className="kv-ask-panel"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Ask Kavi AI Assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="kv-ask-header">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-accent/20 text-blue-light border border-blue-accent/30">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-tight text-text-main">
                  Ask Kavi
                </h3>
                <p className="text-xs text-text-muted">
                  AI answers from his resume and projects
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="tap-target rounded-lg text-text-muted hover:bg-navy-900 hover:text-text-main transition-colors"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 min-h-[260px] max-h-[52vh]">
            {messages.length === 0 ? (
              <div className="my-auto flex flex-col gap-4 text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-glow/30 text-blue-light border border-blue-glow/40">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-main">
                    Curious about Kavi&apos;s experience?
                  </h4>
                  <p className="mt-1 text-xs text-text-muted max-w-sm mx-auto">
                    Ask anything about his AI/ML projects, AWS architectures, or technical background.
                  </p>
                </div>

                {/* Suggestion Chips */}
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="kv-chip"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-blue-accent text-white shadow-blue-glow rounded-br-xs'
                          : 'bg-navy-900 border border-blue-glow/30 text-text-main rounded-bl-xs'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start">
                    <div className="flex items-center gap-1.5 rounded-2xl bg-navy-900 border border-blue-glow/30 px-4 py-3 rounded-bl-xs">
                      <div className="kv-typing-dot" />
                      <div className="kv-typing-dot" />
                      <div className="kv-typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-navy-950/70 p-3 sm:p-4"
          >
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about projects, stack, experience..."
                maxLength={300}
                className="w-full rounded-xl border border-blue-glow/40 bg-navy-900/90 py-2.5 pl-4 pr-12 text-sm text-text-main placeholder-text-muted focus:border-blue-accent focus:bg-navy-900 focus:outline-none"
                aria-label="Your question for Kavi"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-accent text-white transition-opacity hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed"
                aria-label="Send question"
              >
                <Send size={15} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-text-muted/60">
              <span>Press Enter to send</span>
              <span>{input.length}/300</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
