import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, User, Filter, Search, Heart, Brain, Zap, Sunrise } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  duration: string
  instructor: string
  category: string
  thumbnail: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Videos', icon: Play },
    { id: 'healing', name: 'Emotional Healing', icon: Heart },
    { id: 'mindfulness', name: 'Mindfulness', icon: Brain },
    { id: 'self-care', name: 'Self-Care', icon: Zap },
    { id: 'moving-forward', name: 'Moving Forward', icon: Sunrise }
  ]

  const videos: Video[] = [
    {
      id: '1',
      title: 'Understanding Your Emotions After a Breakup',
      description: 'Learn to identify and process the complex emotions that come with the end of a relationship.',
      duration: '12:30',
      instructor: 'Dr. Sarah Mitchell',
      category: 'healing',
      thumbnail: '🎭',
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Breathing Through Difficult Moments',
      description: 'Simple breathing exercises to help you stay grounded when overwhelming emotions arise.',
      duration: '8:45',
      instructor: 'Dr. Michael Chen',
      category: 'mindfulness',
      thumbnail: '🌬️',
      difficulty: 'Beginner'
    },
    {
      id: '3',
      title: 'Creating a Self-Care Routine',
      description: 'Build daily habits that nurture your mind, body, and spirit during your healing journey.',
      duration: '15:20',
      instructor: 'Lisa Rodriguez',
      category: 'self-care',
      thumbnail: '🌸',
      difficulty: 'Beginner'
    },
    {
      id: '4',
      title: 'Letting Go of What No Longer Serves You',
      description: 'A guided meditation to help release attachment to past relationships and embrace new beginnings.',
      duration: '20:00',
      instructor: 'Dr. Emma Thompson',
      category: 'healing',
      thumbnail: '🕊️',
      difficulty: 'Intermediate'
    },
    {
      id: '5',
      title: 'Rediscovering Your Identity',
      description: 'Explore who you are outside of your past relationship and reconnect with your authentic self.',
      duration: '18:15',
      instructor: 'Dr. James Wilson',
      category: 'moving-forward',
      thumbnail: '🔍',
      difficulty: 'Intermediate'
    },
    {
      id: '6',
      title: 'Advanced Emotional Regulation Techniques',
      description: 'Deep dive into advanced strategies for managing intense emotions and building emotional resilience.',
      duration: '25:30',
      instructor: 'Dr. Sarah Mitchell',
      category: 'healing',
      thumbnail: '⚖️',
      difficulty: 'Advanced'
    },
    {
      id: '7',
      title: 'Body Scan for Emotional Release',
      description: 'A comprehensive body scan meditation to identify and release stored emotional tension.',
      duration: '22:45',
      instructor: 'Dr. Michael Chen',
      category: 'mindfulness',
      thumbnail: '🧘',
      difficulty: 'Intermediate'
    },
    {
      id: '8',
      title: 'Building Healthy Boundaries',
      description: 'Learn to set and maintain healthy boundaries as you navigate your healing and future relationships.',
      duration: '16:10',
      instructor: 'Lisa Rodriguez',
      category: 'self-care',
      thumbnail: '🛡️',
      difficulty: 'Intermediate'
    },
    {
      id: '9',
      title: 'Embracing Your New Chapter',
      description: 'Celebrate your growth and prepare for the exciting possibilities that lie ahead.',
      duration: '14:25',
      instructor: 'Dr. Emma Thompson',
      category: 'moving-forward',
      thumbnail: '📖',
      difficulty: 'Advanced'
    }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
            Healing Video Library
          </h1>
          <p className="text-gray-600 text-lg">
            Expert-guided videos to support you through every stage of your healing journey.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="card group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 via-healing-100 to-calm-100 rounded-xl flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <User className="w-3 h-3" />
                    <span>{video.instructor}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {video.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
          </motion.div>
        )}

        {/* Recommended Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 card"
        >
          <h2 className="text-2xl font-bold gradient-text mb-4">Recommended for You</h2>
          <p className="text-gray-600 mb-6">
            Based on your progress and current emotional state, we suggest starting with these videos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.slice(0, 3).map((video) => (
              <div key={video.id} className="p-4 bg-primary-50 rounded-xl">
                <div className="text-2xl mb-2">{video.thumbnail}</div>
                <h4 className="font-semibold text-primary-800 mb-1">{video.title}</h4>
                <p className="text-primary-600 text-sm">{video.instructor} • {video.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Videos