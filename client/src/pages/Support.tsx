import { motion } from 'framer-motion'
import { Users, Phone, MessageSquare, Book, Heart, Shield, ExternalLink, Calendar, Clock } from 'lucide-react'

const Support = () => {
  const supportGroups = [
    {
      id: 1,
      name: 'New Beginnings',
      description: 'For those in the early stages of breakup recovery',
      members: 24,
      nextSession: '2024-01-25T19:00:00',
      topic: 'Processing Initial Emotions',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      name: 'Moving Forward',
      description: 'Focus on rebuilding and personal growth after heartbreak',
      members: 18,
      nextSession: '2024-01-26T18:30:00',
      topic: 'Rediscovering Your Identity',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      name: 'Healing Hearts',
      description: 'Long-term emotional healing and relationship wisdom',
      members: 31,
      nextSession: '2024-01-27T20:00:00',
      topic: 'Building Healthy Boundaries',
      difficulty: 'All Levels'
    },
    {
      id: 4,
      name: 'Self-Love Circle',
      description: 'Cultivating self-compassion and inner strength',
      members: 22,
      nextSession: '2024-01-28T17:00:00',
      topic: 'Practicing Self-Forgiveness',
      difficulty: 'All Levels'
    }
  ]

  const resources = [
    {
      title: 'Understanding Grief in Relationships',
      description: 'Learn about the stages of grief and how they apply to breakups',
      type: 'Article',
      readTime: '8 min',
      icon: Book
    },
    {
      title: 'Building Emotional Resilience',
      description: 'Strategies to bounce back stronger from life\'s challenges',
      type: 'Guide',
      readTime: '12 min',
      icon: Shield
    },
    {
      title: 'Healthy Coping Mechanisms',
      description: 'Replace negative patterns with positive healing practices',
      type: 'Article',
      readTime: '6 min',
      icon: Heart
    },
    {
      title: 'Preparing for Future Relationships',
      description: 'How to heal fully before opening your heart again',
      type: 'Guide',
      readTime: '15 min',
      icon: Users
    }
  ]

  const crisisResources = [
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
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Mental health and substance abuse support',
      available: '24/7'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: 'Support for domestic violence situations',
      available: '24/7'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'All Levels': return 'bg-blue-100 text-blue-800'
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
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Support & Community
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            You're not alone in this journey. Connect with others who understand, access professional resources, and find the support you need.
          </p>
        </motion.div>

        {/* Crisis Support - Priority Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl"
        >
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-red-800">Need Immediate Help?</h2>
          </div>
          
          <p className="text-red-700 mb-4">
            If you're experiencing thoughts of self-harm, suicide, or are in crisis, please reach out immediately:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white rounded-lg border border-red-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-red-800">{resource.name}</h3>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {resource.available}
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-600 mb-1">{resource.number}</p>
                <p className="text-red-700 text-sm">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
            <Users className="w-7 h-7 mr-3" />
            Support Groups
          </h2>
          
          <p className="text-gray-600 mb-6">
            Join anonymous, moderated support groups where you can share experiences and learn from others on similar journeys.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="card group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(group.difficulty)}`}>
                    {group.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(group.nextSession)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Topic: {group.topic}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary"
                >
                  Join Group
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🛡️ Group Guidelines</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• All groups are anonymous and confidential</li>
              <li>• Moderated by trained support facilitators</li>
              <li>• No judgment zone - everyone's experience is valid</li>
              <li>• Sharing is optional - listen if that's all you need</li>
            </ul>
          </div>
        </motion.div>

        {/* Professional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center">
            <Book className="w-7 h-7 mr-3" />
            Professional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                  className="card group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.readTime}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors">
                        <span>Read More</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Additional Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-healing-500 to-healing-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">One-on-One Chat</h3>
            <p className="text-gray-600 text-sm mb-4">
              Schedule a private session with a trained peer counselor for personalized support.
            </p>
            <button className="btn-secondary w-full">
              Schedule Session
            </button>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-calm-500 to-calm-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Professional Therapy</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with licensed therapists who specialize in relationship issues and emotional healing.
            </p>
            <button className="btn-secondary w-full">
              Find Therapist
            </button>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Wellness Check-ins</h3>
            <p className="text-gray-600 text-sm mb-4">
              Regular check-ins with our support team to monitor your progress and wellbeing.
            </p>
            <button className="btn-secondary w-full">
              Enable Check-ins
            </button>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center p-6 bg-gradient-to-r from-primary-50 to-healing-50 rounded-xl"
        >
          <h3 className="text-xl font-semibold gradient-text mb-2">
            Remember: Healing is Not Linear
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            There will be ups and downs, good days and difficult ones. That's completely normal and part of the process. 
            Be patient with yourself, celebrate small victories, and know that support is always available when you need it.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Support