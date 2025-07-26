import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import rateLimit from 'express-rate-limit'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.'
  }
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api/', limiter)

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  // Join support group rooms
  socket.on('join-support-group', (groupId) => {
    socket.join(`support-group-${groupId}`)
    socket.to(`support-group-${groupId}`).emit('user-joined', {
      message: 'Someone joined the group'
    })
  })
  
  // Handle support group messages
  socket.on('support-group-message', (data) => {
    socket.to(`support-group-${data.groupId}`).emit('new-message', {
      message: data.message,
      timestamp: new Date(),
      anonymous: true
    })
  })
  
  // Handle AI chat
  socket.on('ai-chat-message', (data) => {
    // Simple AI response simulation
    setTimeout(() => {
      const responses = [
        "I understand how difficult this must be for you. Your feelings are completely valid.",
        "It's okay to take time to process these emotions. Healing happens at your own pace.",
        "Remember that you're not alone in this journey. Many people have gone through similar experiences.",
        "What you're feeling is a natural response to loss. Be gentle with yourself.",
        "Consider focusing on small acts of self-care today. What would feel nurturing right now?"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      socket.emit('ai-response', {
        message: randomResponse,
        timestamp: new Date()
      })
    }, 1000 + Math.random() * 2000)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Basic health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  })
})

// API Routes
app.get('/api/mood-data', (req, res) => {
  // Mock mood data for progress tracking
  const moodData = Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: Math.floor(Math.random() * 5) + 1,
    note: ''
  }))
  
  res.json(moodData)
})

app.post('/api/mood', (req, res) => {
  const { mood, note, date } = req.body
  
  // In a real app, this would save to database
  console.log('Mood entry:', { mood, note, date })
  
  res.json({ 
    success: true, 
    message: 'Mood recorded successfully',
    data: { mood, note, date }
  })
})

app.get('/api/journal-entries', (req, res) => {
  // Mock journal entries
  const entries = [
    {
      id: '1',
      date: new Date('2024-01-15').toISOString(),
      title: 'First day of healing',
      content: 'Today was difficult, but I took the first step towards healing.',
      mood: 'sad',
      tags: ['healing', 'first-steps']
    },
    {
      id: '2', 
      date: new Date('2024-01-17').toISOString(),
      title: 'Small victories',
      content: 'I managed to go for a walk today and called a friend.',
      mood: 'okay',
      tags: ['progress', 'self-care']
    }
  ]
  
  res.json(entries)
})

app.post('/api/journal-entries', (req, res) => {
  const { title, content, mood, tags } = req.body
  
  const newEntry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    title,
    content,
    mood,
    tags: tags || []
  }
  
  console.log('New journal entry:', newEntry)
  
  res.json({ 
    success: true, 
    message: 'Journal entry saved successfully',
    data: newEntry
  })
})

app.get('/api/support-groups', (req, res) => {
  const groups = [
    {
      id: 1,
      name: 'New Beginnings',
      description: 'For those in the early stages of breakup recovery',
      members: 24,
      nextSession: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      topic: 'Processing Initial Emotions',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      name: 'Moving Forward', 
      description: 'Focus on rebuilding and personal growth after heartbreak',
      members: 18,
      nextSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      topic: 'Rediscovering Your Identity',
      difficulty: 'Intermediate'
    }
  ]
  
  res.json(groups)
})

app.get('/api/progress-stats', (req, res) => {
  const stats = {
    totalDays: 14,
    averageMood: 3.6,
    moodTrend: 'improving',
    journalEntries: 3,
    meditationMinutes: 87,
    videosWatched: 5,
    currentStreak: 7,
    achievements: [
      { id: 1, title: 'First Steps', earned: true, date: '2024-01-10' },
      { id: 2, title: 'Week Warrior', earned: true, date: '2024-01-17' },
      { id: 3, title: 'Mindful Moments', earned: true, date: '2024-01-20' },
      { id: 4, title: 'Journal Journey', earned: false, date: null }
    ]
  }
  
  res.json(stats)
})

// Crisis support endpoints
app.get('/api/crisis-resources', (req, res) => {
  const resources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741', 
      description: 'Free, 24/7 support via text message',
      available: '24/7'
    }
  ]
  
  res.json(resources)
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  })
})

server.listen(PORT, () => {
  console.log(`🚀 Healify server running on port ${PORT}`)
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`)
  console.log(`💚 Ready to help heal hearts!`)
})