import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Calendar, Heart, Lightbulb, Save, Plus, Filter, Search } from 'lucide-react'
import { format } from 'date-fns'

interface JournalEntry {
  id: string
  date: Date
  title: string
  content: string
  mood: string
  prompt?: string
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date('2024-01-15'),
      title: 'First day of healing',
      content: 'Today was difficult, but I took the first step towards healing. I downloaded this app and talked to the AI assistant. It felt good to express my feelings without judgment.',
      mood: 'sad',
      prompt: 'How are you feeling today?'
    },
    {
      id: '2',
      date: new Date('2024-01-17'),
      title: 'Small victories',
      content: 'I managed to go for a walk today and called a friend. These small steps feel significant. I\'m learning that healing is not linear, and that\'s okay.',
      mood: 'okay',
      prompt: 'What small victory can you celebrate today?'
    }
  ])
  
  const [isWriting, setIsWriting] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: '',
    prompt: ''
  })
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  const prompts = [
    "How are you feeling today?",
    "What are you grateful for right now?",
    "What small victory can you celebrate today?",
    "What would you tell a friend going through the same thing?",
    "What are you learning about yourself?",
    "What brings you comfort when you're feeling sad?",
    "How have you grown since your breakup?",
    "What activities make you feel most like yourself?",
    "What hopes do you have for your future?",
    "What would your future self want you to know right now?"
  ]

  const moods = [
    { value: 'great', emoji: '😊', label: 'Great', color: 'text-green-500' },
    { value: 'good', emoji: '🙂', label: 'Good', color: 'text-blue-500' },
    { value: 'okay', emoji: '😐', label: 'Okay', color: 'text-yellow-500' },
    { value: 'sad', emoji: '😔', label: 'Sad', color: 'text-orange-500' },
    { value: 'very-sad', emoji: '😢', label: 'Very Sad', color: 'text-red-500' }
  ]

  const handleStartWriting = (prompt?: string) => {
    setIsWriting(true)
    setCurrentEntry({
      title: '',
      content: '',
      mood: '',
      prompt: prompt || ''
    })
    setSelectedPrompt(prompt || null)
  }

  const handleSaveEntry = () => {
    if (!currentEntry.title.trim() && !currentEntry.content.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: currentEntry.title || `Entry from ${format(new Date(), 'MMM dd, yyyy')}`,
      content: currentEntry.content,
      mood: currentEntry.mood,
      prompt: currentEntry.prompt
    }

    setEntries(prev => [newEntry, ...prev])
    setIsWriting(false)
    setCurrentEntry({ title: '', content: '', mood: '', prompt: '' })
    setSelectedPrompt(null)
  }

  const handleCancel = () => {
    setIsWriting(false)
    setCurrentEntry({ title: '', content: '', mood: '', prompt: '' })
    setSelectedPrompt(null)
  }

  const getMoodEmoji = (mood: string) => {
    const moodObj = moods.find(m => m.value === mood)
    return moodObj ? moodObj.emoji : '😐'
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Your Personal Journal
          </h1>
          <p className="text-gray-600 text-lg">
            A safe space to express your thoughts, track your emotions, and document your healing journey.
          </p>
        </motion.div>

        {!isWriting ? (
          <>
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card mb-8"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PenTool className="w-6 h-6 text-primary-500 mr-2" />
                Start Writing
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartWriting()}
                  className="p-4 border-2 border-primary-200 hover:border-primary-300 rounded-xl transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Plus className="w-6 h-6 text-primary-500" />
                    <span className="text-sm text-primary-600 font-medium">Free Writing</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Start a new entry</h3>
                  <p className="text-gray-600 text-sm">Write freely about whatever is on your mind today.</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPrompt('random')}
                  className="p-4 border-2 border-healing-200 hover:border-healing-300 rounded-xl transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Lightbulb className="w-6 h-6 text-healing-500" />
                    <span className="text-sm text-healing-600 font-medium">Guided</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Use a prompt</h3>
                  <p className="text-gray-600 text-sm">Let a thoughtful prompt guide your reflection.</p>
                </motion.button>
              </div>
            </motion.div>

            {/* Prompt Selection */}
            {selectedPrompt === 'random' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card mb-8"
              >
                <h3 className="text-lg font-semibold mb-4">Choose a writing prompt:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleStartWriting(prompt)}
                      className="p-3 text-left border border-gray-200 hover:border-primary-300 hover:bg-primary-50 rounded-lg transition-all duration-200"
                    >
                      <p className="text-gray-700 font-medium">{prompt}</p>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Previous Entries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Calendar className="w-6 h-6 text-primary-500 mr-2" />
                Your Entries
              </h2>

              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="card hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                          <p className="text-sm text-gray-500">
                            {format(entry.date, 'EEEE, MMMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {entry.prompt && (
                      <div className="mb-3 p-3 bg-healing-50 rounded-lg">
                        <p className="text-sm text-healing-700 font-medium">Prompt: {entry.prompt}</p>
                      </div>
                    )}

                    <p className="text-gray-700 leading-relaxed">
                      {entry.content.length > 200 
                        ? `${entry.content.substring(0, 200)}...`
                        : entry.content
                      }
                    </p>

                    {entry.content.length > 200 && (
                      <button className="mt-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium">
                        Read more
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {entries.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Start your first entry</h3>
                  <p className="text-gray-600">Your thoughts and feelings matter. Begin documenting your healing journey today.</p>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          /* Writing Interface */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">New Journal Entry</h2>
              <p className="text-gray-600">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
            </div>

            {selectedPrompt && (
              <div className="mb-6 p-4 bg-healing-50 rounded-lg">
                <p className="text-healing-700 font-medium">✨ {selectedPrompt}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Give your entry a title (optional)"
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <textarea
                  placeholder="Write your thoughts here..."
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[300px] resize-none"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">How are you feeling?</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                        currentEntry.mood === mood.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="font-medium">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveEntry}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Entry</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Journal