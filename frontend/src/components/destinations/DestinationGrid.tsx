import { motion } from 'framer-motion'
import { useState } from 'react'
import LazyImage from '../common/LazyImage'
import DestinationDetailModal from './DestinationDetailModal'
import type { Destination } from '../../types'

export default function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id))
  }

  const getFallbackImage = (category: string) => {
    const fallbacks: Record<string, string> = {
      'Beach & Hills': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      'Temple & Spiritual': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop',
      'Cultural & Heritage': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop',
      'Beach & Nightlife': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
      'Hills & Nature': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop',
      'Heritage & Royal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop',
      'Spiritual & Ancient': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop',
      'Backwaters & Nature': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop',
      'Adventure & Spiritual': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop',
      'Beach & Colonial': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop'
    }
    return fallbacks[category] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl overflow-hidden shadow-card bg-white/5 backdrop-blur-sm border border-white/10 group hover:border-white/20 transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <LazyImage 
              src={d.imageUrl}
              alt={d.name}
              fallbackSrc={getFallbackImage(d.category)}
              onError={() => handleImageError(d.id)}
              className="h-full w-full group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30">
                {d.category}
              </span>
            </div>

            {/* Best Time Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-green-300 border border-green-400/30">
                Best: {d.bestTime}
              </span>
            </div>

            {/* Price Overlay */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                <p className="text-white font-semibold text-lg">
                  ₹{d.pricePerNight.toLocaleString('en-IN')}
                </p>
                <p className="text-white/70 text-xs">per night</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-white mb-1">{d.name}</h3>
              <p className="text-white/70 text-sm">{d.state}, {d.country}</p>
            </div>
            
            <p className="text-white/80 text-sm mb-4 leading-relaxed">{d.description}</p>
            
            {/* Highlights */}
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">Must Visit:</h4>
              <div className="flex flex-wrap gap-1">
                {d.highlights.slice(0, 3).map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/20"
                  >
                    {highlight}
                  </span>
                ))}
                {d.highlights.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/20">
                    +{d.highlights.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedDestination(d)
                setIsModalOpen(true)
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Destination
            </motion.button>
          </div>
        </motion.div>
      ))}

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedDestination(null)
        }}
      />
    </div>
  )
}



