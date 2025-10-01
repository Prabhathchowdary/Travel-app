import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Destination, BookingRequest } from '../../types'
import { createBooking } from '../../lib/api'

type Props = { destinations: Destination[] }

const steps = [
  'Select Destination',
  'Select Dates',
  'Travelers',
  'Review & Confirm',
]

export default function BookingFlow({ destinations }: Props) {
  const [step, setStep] = useState(0)
  const [destinationId, setDestinationId] = useState<number | null>(null)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [travelers, setTravelers] = useState(2)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bookingId, setBookingId] = useState<string | null>(null)

  const destination = useMemo(() => destinations.find(d => d.id === destinationId), [destinations, destinationId])

  // Debug logging
  console.log('BookingFlow - destinations:', destinations.length, destinations)
  console.log('BookingFlow - destinationId:', destinationId)
  console.log('BookingFlow - selected destination:', destination)

  const canNext = () => {
    if (step === 0) return destinationId !== null
    if (step === 1) return Boolean(startDate && endDate)
    if (step === 2) return travelers > 0
    if (step === 3) return Boolean(fullName && email)
    return false
  }

  async function confirmBooking() {
    if (!destinationId) return
    const payload: BookingRequest = { destinationId, startDate, endDate, travelers, fullName, email }
    const res = await createBooking(payload)
    setBookingId(res.bookingId)
  }

  return (
    <div className="glass rounded-2xl border border-white/15 p-4 md:p-6">
      <div className="flex items-center gap-3 text-sm text-white/80">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full grid place-items-center text-xs ${i <= step ? 'bg-white text-black' : 'bg-white/10'}`}>{i + 1}</div>
            <span className={`${i === step ? 'text-white' : ''}`}>{s}</span>
            {i < steps.length - 1 && <span className="opacity-40">—</span>}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="grid md:grid-cols-3 gap-3">
                <select 
                  value={destinationId ?? ''} 
                  onChange={e => setDestinationId(Number(e.target.value))} 
                  className="bg-[#0e1512]/90 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all appearance-none"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled className="bg-[#0e1512] text-white">Select destination</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.id} className="bg-[#0e1512] text-white">{d.name} — {d.state}</option>
                  ))}
                </select>
                <input 
                  type="date" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)} 
                />
                <input 
                  type="date" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                />
              </div>
            )}

            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-3">
                <input 
                  type="date" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)} 
                />
                <input 
                  type="date" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-3 gap-3 items-center">
                <label className="opacity-80 text-white">Travelers</label>
                <input 
                  type="number" 
                  min={1} 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 md:col-span-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={travelers} 
                  onChange={e => setTravelers(Number(e.target.value))} 
                />
              </div>
            )}

            {step === 3 && (
              <div className="grid md:grid-cols-2 gap-3">
                <input 
                  placeholder="Full name" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={fullName} 
                  onChange={e => setFullName(e.target.value)} 
                />
                <input 
                  placeholder="Email" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
                <div className="md:col-span-2 text-sm text-white/80">
                  {destination && (
                    <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 mt-2">
                      <div>
                        <div className="font-semibold text-white">Your stay: {destination.name}</div>
                        <div className="text-xs opacity-80">{startDate} → {endDate} • {travelers} guests</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80">From</div>
                        <div className="text-lg font-semibold text-white">₹{destination.pricePerNight.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {bookingId && (
              <div className="mt-3 text-emerald-300">Booking is confirmed! ID: {bookingId}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button 
          disabled={step === 0} 
          onClick={() => setStep(s => Math.max(0, s - 1))} 
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white disabled:opacity-40 hover:bg-white/20 transition-all"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button 
            disabled={!canNext()} 
            onClick={() => setStep(s => s + 1)} 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white disabled:opacity-40 transition-all shadow-lg hover:shadow-xl"
          >
            Next
          </button>
        ) : (
          <button 
            disabled={!canNext()} 
            onClick={confirmBooking} 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white disabled:opacity-40 transition-all shadow-lg hover:shadow-xl"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  )
}