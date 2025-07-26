import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Heart, MessageCircle, MoreVertical, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  typing?: boolean
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to support you through this difficult time. I understand that breakups can be incredibly painful, and I want you to know that your feelings are completely valid. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      sad: [
        "I can hear the pain in your words, and I want you to know that what you're feeling is completely normal. Sadness after a breakup is a natural part of the healing process. Would you like to talk about what's making you feel particularly sad right now?",
        "It's okay to feel sad. Grief is love with nowhere to go, and that's a testament to how deeply you cared. Take your time with these feelings. What small thing could bring you a moment of comfort today?",
        "Your sadness shows how much this relationship meant to you. That's not something to be ashamed of - it's a sign of your capacity to love. What would you like to do right now to take care of yourself?"
      ],
      angry: [
        "Anger is such a valid emotion after a breakup. It often comes from feeling hurt, betrayed, or powerless. It's okay to feel angry - just remember that these feelings will pass. What's fueling your anger right now?",
        "I understand you're feeling angry. Sometimes anger is easier to feel than sadness because it gives us a sense of power. Would it help to talk about what specifically is making you angry?",
        "Your anger is telling you something important about your boundaries and values. It's okay to feel this way. Have you found any healthy ways to express or release this anger?"
      ],
      lonely: [
        "Loneliness after a breakup can feel overwhelming. You've lost not just a partner, but a daily companion, and that absence is real and valid. You're not alone though - I'm here with you. What aspects of being alone feel hardest right now?",
        "The loneliness you're feeling is so understandable. When someone who was a big part of your daily life is suddenly gone, that emptiness feels huge. Would you like to talk about ways to gradually fill that space with things that bring you joy?",
        "I hear that you're feeling lonely. It's important to remember that being alone doesn't mean being lonely forever. This is temporary, even though it doesn't feel like it right now. What connections in your life still bring you comfort?"
      ],
      confused: [
        "Breakups can leave us feeling so confused about everything - what went wrong, what we could have done differently, what happens next. This mental fog is completely normal. What's the most confusing part for you right now?",
        "Confusion is such a common response to breakups because they turn our whole world upside down. All the plans and assumptions we had suddenly don't apply anymore. Would it help to talk through some of these confusing thoughts?",
        "I understand the confusion you're feeling. Breakups force us to rewrite our story, and that's disorienting. There's no rush to have all the answers right now. What's one small thing that feels clear to you today?"
      ],
      hope: [
        "I'm so glad to hear some hope in your words. Healing isn't linear, and having moments of hope is a beautiful sign that you're processing this experience. What's giving you hope today?",
        "Hope is such a powerful force in healing. Even if it comes and goes, the fact that you can feel it shows your resilience. What would you like to nurture this sense of hope?",
        "It's wonderful that you're feeling hopeful. That hope is your inner strength speaking up, reminding you that you will get through this. How can we build on this feeling?"
      ],
      default: [
        "I'm here to listen and support you through whatever you're feeling. Every emotion you have right now is valid and part of your healing journey. What would be most helpful for you right now?",
        "Thank you for sharing with me. Processing a breakup takes time, and there's no right or wrong way to feel. What's on your mind today?",
        "I appreciate you opening up to me. Healing happens at your own pace, and I'm here to support you every step of the way. What would you like to explore together?"
      ]
    }

    // Simple keyword matching for demonstration
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('cry') || lowerMessage.includes('hurt')) {
      return responses.sad[Math.floor(Math.random() * responses.sad.length)]
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('furious')) {
      return responses.angry[Math.floor(Math.random() * responses.angry.length)]
    } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('empty')) {
      return responses.lonely[Math.floor(Math.random() * responses.lonely.length)]
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('don\'t understand') || lowerMessage.includes('why')) {
      return responses.confused[Math.floor(Math.random() * responses.confused.length)]
    } else if (lowerMessage.includes('better') || lowerMessage.includes('hope') || lowerMessage.includes('positive')) {
      return responses.hope[Math.floor(Math.random() * responses.hope.length)]
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)]
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 2000) // 1.5-3.5 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickResponses = [
    "I'm feeling really sad today",
    "I can't stop thinking about them",
    "I feel angry about what happened",
    "I'm having trouble sleeping",
    "I feel lost and confused",
    "I'm ready to move forward"
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-healing-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AI Support Assistant</h1>
                <p className="text-sm text-gray-600">Always here to listen and support you</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className="card h-[60vh] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-xs font-medium text-primary-600">AI Assistant</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.text}</p>
                    <div className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="text-xs font-medium text-primary-600">AI Assistant</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickResponses.map((response, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputText(response)}
                  className="text-xs bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-600 px-3 py-2 rounded-full transition-colors"
                >
                  {response}
                </motion.button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Emergency Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <h3 className="font-semibold text-red-800 mb-2">Need immediate help?</h3>
          <p className="text-sm text-red-700 mb-3">
            If you're having thoughts of self-harm or suicide, please reach out for immediate support:
          </p>
          <div className="space-y-1 text-sm">
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>Emergency Services:</strong> 911</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Chat