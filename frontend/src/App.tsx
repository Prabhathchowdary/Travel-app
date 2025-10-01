import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookingFlow from './components/booking/BookingFlow'
import DestinationGrid from './components/destinations/DestinationGrid'
import Header from './components/layout/Header'
import { fetchDestinations } from './lib/api'
import type { Destination } from './types'

export default function App() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true)
        const data = await fetchDestinations()
        console.log('App - loaded destinations:', data.length, data)
        setDestinations(data)
        setError(null)
      } catch (err) {
        console.error('App - error loading destinations:', err)
        setError('Failed to load destinations')
        setDestinations([])
      } finally {
        setLoading(false)
      }
    }
    
    loadDestinations()
  }, [])

  return (
    <div className="min-h-screen bg-[#0e1512] text-white font-display">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-[80vh] object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1512] via-[#0e1512]/60 to-[#0e1512]/40" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30"
          />
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute bottom-40 left-1/4 w-8 h-8 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col justify-center h-[80vh]">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20 mb-6"
            >
              ✨ Real-time availability & instant bookings
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amazing India
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              From ancient temples to pristine beaches, from hill stations to bustling cities - 
              experience India's incredible diversity with real-time images and instant bookings.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="glass rounded-2xl border border-white/15 p-8 text-center">
                  <div className="text-white/80">Loading destinations...</div>
                </div>
              ) : error ? (
                <div className="glass rounded-2xl border border-red-500/20 p-8 text-center">
                  <div className="text-red-400">Error: {error}</div>
                  <div className="text-white/60 mt-2">Using fallback data</div>
                </div>
              ) : (
                <BookingFlow destinations={destinations} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            Discover Amazing Destinations
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            From pristine beaches to ancient temples, from hill stations to bustling cities - 
            explore India's diverse beauty with real-time availability and instant bookings.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['All', 'Beach & Hills', 'Temple & Spiritual', 'Cultural & Heritage', 'Beach & Nightlife', 'Hills & Nature', 'Heritage & Royal'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-white/80">Loading destinations...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-2">Error loading destinations</div>
            <div className="text-white/60">Using fallback data</div>
          </div>
        ) : (
          <DestinationGrid destinations={destinations} />
        )}

        {/* Stats Section */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "10+", label: "Destinations" },
            { number: "50K+", label: "Happy Guests" },
            { number: "24/7", label: "Support" },
            { number: "100%", label: "Real Images" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} SuiteSavvy — 100k+ happy guests
      </footer>
    </div>
  )
}


