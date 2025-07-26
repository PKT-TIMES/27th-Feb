import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Heart, Target, Award, ArrowUp, ArrowDown, Minus } from 'lucide-react'

const Progress = () => {
  // Mock data for demonstration
  const moodData = [
    { date: '2024-01-10', mood: 2, label: 'Very Sad' },
    { date: '2024-01-11', mood: 2, label: 'Very Sad' },
    { date: '2024-01-12', mood: 3, label: 'Sad' },
    { date: '2024-01-13', mood: 2, label: 'Very Sad' },
    { date: '2024-01-14', mood: 3, label: 'Sad' },
    { date: '2024-01-15', mood: 3, label: 'Sad' },
    { date: '2024-01-16', mood: 4, label: 'Okay' },
    { date: '2024-01-17', mood: 4, label: 'Okay' },
    { date: '2024-01-18', mood: 3, label: 'Sad' },
    { date: '2024-01-19', mood: 4, label: 'Okay' },
    { date: '2024-01-20', mood: 5, label: 'Good' },
    { date: '2024-01-21', mood: 4, label: 'Okay' },
    { date: '2024-01-22', mood: 5, label: 'Good' },
    { date: '2024-01-23', mood: 5, label: 'Good' },
  ]

  const achievements = [
    { 
      id: 1, 
      title: 'First Steps', 
      description: 'Completed your first day', 
      earned: true, 
      date: '2024-01-10',
      icon: '🌱'
    },
    { 
      id: 2, 
      title: 'Week Warrior', 
      description: 'Used the app for 7 consecutive days', 
      earned: true, 
      date: '2024-01-17',
      icon: '💪'
    },
    { 
      id: 3, 
      title: 'Mindful Moments', 
      description: 'Completed 5 meditation sessions', 
      earned: true, 
      date: '2024-01-20',
      icon: '🧘'
    },
    { 
      id: 4, 
      title: 'Emotional Explorer', 
      description: 'Tracked your mood for 10 days', 
      earned: true, 
      date: '2024-01-21',
      icon: '📊'
    },
    { 
      id: 5, 
      title: 'Journal Journey', 
      description: 'Write 5 journal entries', 
      earned: false, 
      date: null,
      icon: '📖'
    },
    { 
      id: 6, 
      title: 'Video Viewer', 
      description: 'Watch 10 healing videos', 
      earned: false, 
      date: null,
      icon: '📺'
    },
    { 
      id: 7, 
      title: 'Support Seeker', 
      description: 'Join a support group session', 
      earned: false, 
      date: null,
      icon: '👥'
    },
    { 
      id: 8, 
      title: 'Healing Hero', 
      description: 'Complete 30 days of consistent use', 
      earned: false, 
      date: null,
      icon: '🏆'
    }
  ]

  const stats = {
    totalDays: 14,
    averageMood: 3.6,
    moodTrend: 'improving',
    journalEntries: 3,
    meditationMinutes: 87,
    videosWatched: 5,
    currentStreak: 7
  }

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1: return 'bg-red-500'
      case 2: return 'bg-red-400'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-blue-500'
      case 5: return 'bg-green-500'
      default: return 'bg-gray-400'
    }
  }

  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1: return '😢'
      case 2: return '😔'
      case 3: return '😐'
      case 4: return '🙂'
      case 5: return '😊'
      default: return '😐'
    }
  }

  const getTrendIcon = () => {
    switch (stats.moodTrend) {
      case 'improving': return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'declining': return <ArrowDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const maxMood = Math.max(...moodData.map(d => d.mood))
  const minMood = Math.min(...moodData.map(d => d.mood))

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Your Healing Progress
          </h1>
          <p className="text-gray-600 text-lg">
            Track your emotional journey and celebrate every step forward.
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.totalDays}</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          
          <div className="card text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <span className="text-2xl font-bold text-primary-600">{stats.averageMood.toFixed(1)}</span>
              {getTrendIcon()}
            </div>
            <div className="text-sm text-gray-600">Avg Mood</div>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.meditationMinutes}</div>
            <div className="text-sm text-gray-600">Meditation Min</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Mood Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-6 h-6 text-primary-500 mr-2" />
                Mood Tracking
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Trend:</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon()}
                  <span className={`font-medium ${
                    stats.moodTrend === 'improving' ? 'text-green-600' : 
                    stats.moodTrend === 'declining' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stats.moodTrend}
                  </span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-64 border border-gray-200 rounded-lg p-4">
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                <span>😊 Great</span>
                <span>🙂 Good</span>
                <span>😐 Okay</span>
                <span>😔 Sad</span>
                <span>😢 Very Sad</span>
              </div>
              
              <div className="ml-12 h-full relative">
                <svg className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    points={moodData.map((point, index) => {
                      const x = (index / (moodData.length - 1)) * 100
                      const y = 100 - ((point.mood - 1) / 4) * 100
                      return `${x}%,${y}%`
                    }).join(' ')}
                  />
                  {moodData.map((point, index) => {
                    const x = (index / (moodData.length - 1)) * 100
                    const y = 100 - ((point.mood - 1) / 4) * 100
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="#22c55e"
                        className="hover:r-6 transition-all cursor-pointer"
                      >
                        <title>{`${point.date}: ${point.label}`}</title>
                      </circle>
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map(mood => (
                <div key={mood} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getMoodColor(mood)}`}></div>
                  <span className="text-xs text-gray-600">
                    {getMoodEmoji(mood)} {mood === 1 ? 'Very Sad' : mood === 2 ? 'Sad' : mood === 3 ? 'Okay' : mood === 4 ? 'Good' : 'Great'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 text-primary-500 mr-2" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Journal Entries</span>
                  <span className="font-medium">{stats.journalEntries}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Videos Watched</span>
                  <span className="font-medium">{stats.videosWatched}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Meditation Time</span>
                  <span className="font-medium">{stats.meditationMinutes}m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Chat Sessions</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 text-primary-500 mr-2" />
                Goals
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Check-ins</span>
                    <span>7/7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mindfulness</span>
                    <span>5/7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[71%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Journaling</span>
                    <span>3/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="w-6 h-6 text-primary-500 mr-2" />
            Achievements
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  achievement.earned
                    ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-yellow-500 mt-2">
                    Earned {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 card"
        >
          <h2 className="text-xl font-semibold mb-6">📈 Your Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🌟 What's Working</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Your mood has improved 40% over the past week</li>
                <li>• Consistent daily check-ins are helping you stay aware</li>
                <li>• Meditation sessions correlate with better mood days</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Suggestions</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Try journaling on days when you feel sad</li>
                <li>• Consider longer meditation sessions</li>
                <li>• Watch healing videos during difficult moments</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Progress