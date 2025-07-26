import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Video, BookOpen, Brain, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react'

const Homepage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Support',
      description: 'Get instant emotional support from our compassionate AI assistant, available 24/7.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Video,
      title: 'Guided Videos',
      description: 'Watch expert-curated videos tailored to your healing journey and current emotional state.',
      color: 'from-healing-500 to-healing-600'
    },
    {
      icon: BookOpen,
      title: 'Personal Journal',
      description: 'Express your thoughts safely in your private journal with guided prompts and reflections.',
      color: 'from-calm-500 to-calm-600'
    },
    {
      icon: Brain,
      title: 'Mindfulness',
      description: 'Practice meditation, breathing exercises, and mindfulness techniques for inner peace.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your emotional healing journey with beautiful visualizations and insights.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar journeys in our safe, anonymous support groups.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-healing-100/30 to-calm-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="floating-element inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-healing-500 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Heal Your Heart</span>
              <br />
              <span className="text-gray-800">Find Your Strength</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your compassionate companion through breakup recovery. Get personalized support, 
              expert guidance, and tools to rebuild your emotional wellbeing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard" className="btn-primary group">
                Start Your Healing Journey
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/chat" className="btn-secondary">
                Talk to Our AI Assistant
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Scientifically Backed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>10k+ People Helped</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Everything You Need to Heal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides multiple pathways to recovery, 
              ensuring you have the right support at every step of your journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="card group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 via-healing-500 to-calm-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands who have found peace, strength, and renewed hope through our platform.
            </p>
            <Link 
              to="/dashboard"
              className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Homepage