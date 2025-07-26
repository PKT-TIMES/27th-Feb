import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Videos from './pages/Videos'
import Journal from './pages/Journal'
import Meditation from './pages/Meditation'
import Progress from './pages/Progress'
import Support from './pages/Support'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App