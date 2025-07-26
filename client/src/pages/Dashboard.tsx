import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  MessageCircle, 
  Video, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Calendar,
  Smile,
  Meh,
  Frown,
  ChevronRight,
  Target,
  Award,
  Clock
} from 'lucide-react'

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const quickActions = [
    {
      title: 'Talk to AI Assistant',
      description: 'Get immediate emotional support',
      icon: MessageCircle,
      link: '/chat',
      color: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Watch Healing Videos',
      description: 'Expert guidance for your journey',
      icon: Video,
      link: '/videos',
      color: 'from-healing-500 to-healing-600'
    },
    {
      title: 'Write in Journal',
      description: 'Express your thoughts safely',
      icon: BookOpen,
      link: '/journal',
      color: 'from-calm-500 to-calm-600'
    },
    {
      title: 'Practice Mindfulness',
      description: 'Meditation and breathing exercises',
      icon: Brain,
      link: '/meditation',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const moodOptions = [
    { emoji: '😊', label: 'Great', value: 'great', icon: Smile, color: 'text-green-500' },
    { emoji: '🙂', label: 'Good', value: 'good', icon: Smile, color: 'text-blue-500' },
    { emoji: '😐', label: 'Okay', value: 'okay', icon: Meh, color: 'text-yellow-500' },
    { emoji: '😔', label: 'Sad', value: 'sad', icon: Frown, color: 'text-orange-500' },
    { emoji: '😢', label: 'Very Sad', value: 'very-sad', icon: Frown, color: 'text-red-500' }
  ]

  const achievements = [
    { title: '7 Days Strong', description: 'Used the app for a week', earned: true },
    { title: 'Mindful Moments', description: 'Completed 5 meditation sessions', earned: true },
    { title: 'Journal Writer', description: 'Wrote 10 journal entries', earned: false },
    { title: 'Video Learner', description: 'Watched 15 healing videos', earned: false }
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Welcome back! 💚
          </h1>
          <p className="text-gray-600">How are you feeling today? Let's continue your healing journey.</p>
        </motion.div>

        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Daily Mood Check-in</h2>
          </div>
          <p className="text-gray-600 mb-4">Track your emotional state to monitor your progress over time.</p>
          
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  selectedMood === mood.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{mood.label}</div>
              </motion.button>
            ))}
          </div>
          
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-primary-50 rounded-lg"
            >
              <p className="text-primary-700">
                Thank you for sharing how you're feeling today. Your mood has been recorded.
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Target className="w-6 h-6 text-primary-500 mr-2" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Link
                        to={action.link}
                        className="block p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-all duration-200 group hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Streak */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Calendar className="w-5 h-5 text-primary-500 mr-2" />
                  Current Streak
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">7</div>
                <div className="text-sm text-gray-600">days strong</div>
              </div>
            </div>

            {/* Today's Progress */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 text-primary-500 mr-2" />
                Today's Progress
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Mood check-in</span>
                  <span className="text-green-500">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Mindfulness session</span>
                  <span className="text-gray-400">○</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Journal entry</span>
                  <span className="text-gray-400">○</span>
                </div>
              </div>
              <Link to="/progress" className="mt-4 block text-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium">
                View Full Progress →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="w-6 h-6 text-primary-500 mr-2" />
            Your Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`p-4 rounded-xl border-2 text-center ${
                  achievement.earned
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`text-2xl mb-2 ${achievement.earned ? '' : 'grayscale'}`}>
                  🏆
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard