import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Heart, Brain, Wind, Sunset } from 'lucide-react'

const Meditation = () => {
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [breathingTimer, setBreathingTimer] = useState(0)

  const sessions = [
    {
      id: 'breathing-basic',
      title: 'Basic Breathing Exercise',
      description: 'Simple 4-7-8 breathing technique to calm your nervous system',
      duration: 5,
      type: 'breathing',
      icon: Wind,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'healing-heart',
      title: 'Healing Your Heart',
      description: 'A guided meditation focused on emotional healing and self-compassion',
      duration: 15,
      type: 'guided',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'letting-go',
      title: 'Letting Go Meditation',
      description: 'Release attachment to past relationships and embrace new beginnings',
      duration: 20,
      type: 'guided',
      icon: Sunset,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'anxiety-relief',
      title: 'Anxiety Relief',
      description: 'Calm racing thoughts and find peace in the present moment',
      duration: 10,
      type: 'guided',
      icon: Brain,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'self-love',
      title: 'Self-Love & Acceptance',
      description: 'Cultivate kindness and compassion towards yourself',
      duration: 12,
      type: 'guided',
      icon: Heart,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'breathing-advanced',
      title: 'Advanced Breathing',
      description: 'Box breathing technique for deeper relaxation and focus',
      duration: 8,
      type: 'breathing',
      icon: Wind,
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const breathingCycles = {
    'breathing-basic': { inhale: 4, hold: 7, exhale: 8, pause: 2 },
    'breathing-advanced': { inhale: 4, hold: 4, exhale: 4, pause: 4 }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            setActiveSession(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, timeRemaining])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeSession && sessions.find(s => s.id === activeSession)?.type === 'breathing' && isPlaying) {
      const cycle = breathingCycles[activeSession as keyof typeof breathingCycles]
      
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const newTimer = prev + 1
          const totalCycleTime = cycle.inhale + cycle.hold + cycle.exhale + cycle.pause
          const position = newTimer % totalCycleTime

          if (position < cycle.inhale) {
            setBreathingPhase('inhale')
          } else if (position < cycle.inhale + cycle.hold) {
            setBreathingPhase('hold')
          } else if (position < cycle.inhale + cycle.hold + cycle.exhale) {
            setBreathingPhase('exhale')
          } else {
            setBreathingPhase('pause')
          }

          return newTimer
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeSession, isPlaying])

  const startSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId)
    if (!session) return

    setActiveSession(sessionId)
    setTimeRemaining(session.duration * 60)
    setIsPlaying(true)
    setBreathingTimer(0)
    setBreathingPhase('inhale')
  }

  const pauseSession = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSession = () => {
    setIsPlaying(false)
    setActiveSession(null)
    setTimeRemaining(0)
    setBreathingTimer(0)
    setBreathingPhase('inhale')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'pause': return 'Pause'
    }
  }

  const getBreathingCircleScale = () => {
    switch (breathingPhase) {
      case 'inhale': return 1.2
      case 'hold': return 1.2
      case 'exhale': return 0.8
      case 'pause': return 0.8
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Mindfulness & Meditation
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find peace and clarity through guided meditations and breathing exercises designed to support your emotional healing.
          </p>
        </motion.div>

        {activeSession ? (
          /* Active Session Interface */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {sessions.find(s => s.id === activeSession)?.title}
              </h2>
              <div className="text-3xl font-mono text-primary-600 mb-4">
                {formatTime(timeRemaining)}
              </div>
            </div>

            {sessions.find(s => s.id === activeSession)?.type === 'breathing' ? (
              /* Breathing Exercise Interface */
              <div className="mb-8">
                <motion.div
                  animate={{ scale: getBreathingCircleScale() }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Wind className="w-16 h-16 text-white" />
                </motion.div>
                
                <motion.div
                  key={breathingPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {getBreathingInstruction()}
                  </h3>
                  <p className="text-gray-600">
                    Follow the circle and breathe naturally
                  </p>
                </motion.div>
              </div>
            ) : (
              /* Guided Meditation Interface */
              <div className="mb-8">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Brain className="w-16 h-16 text-white" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Listen and Follow Along
                  </h3>
                  <div className="space-y-2 text-gray-600 max-w-md mx-auto">
                    <p>• Find a comfortable position</p>
                    <p>• Close your eyes gently</p>
                    <p>• Let the guided voice lead you</p>
                    <p>• There's no wrong way to meditate</p>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseSession}
                className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetSession}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>End Session</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Session Selection */
          <>
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Breathing Exercises</h3>
                    <p className="text-gray-600 text-sm">Quick techniques to calm your mind</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Simple yet powerful breathing patterns that help regulate your nervous system and provide immediate relief from anxiety and stress.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Guided Meditations</h3>
                    <p className="text-gray-600 text-sm">Deeper healing sessions</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Expert-guided meditations specifically designed for emotional healing, self-compassion, and moving forward after a breakup.
                </p>
              </div>
            </motion.div>

            {/* Sessions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sessions.map((session, index) => {
                const Icon = session.icon
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="card group cursor-pointer"
                    onClick={() => startSession(session.id)}
                  >
                    <div className="mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${session.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mb-2">
                          {session.duration} min
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2 text-center group-hover:text-primary-600 transition-colors">
                      {session.title}
                    </h3>

                    <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
                      {session.description}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Session</span>
                    </motion.button>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 card"
            >
              <h2 className="text-2xl font-bold gradient-text mb-6">Tips for Better Meditation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">🌅 Best Times to Practice</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Early morning to set a positive tone</li>
                    <li>• During lunch breaks for midday reset</li>
                    <li>• Evening to process the day's emotions</li>
                    <li>• Whenever you feel overwhelmed</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">🧘 Creating Your Space</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Find a quiet, comfortable spot</li>
                    <li>• Use headphones for better focus</li>
                    <li>• Sit or lie down comfortably</li>
                    <li>• Keep distractions away</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-700 text-center">
                  <strong>Remember:</strong> There's no "perfect" way to meditate. Be kind to yourself and allow whatever comes up to be present.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Meditation