import axios from 'axios'
import type { Destination, AvailabilityResponse, BookingRequest, BookingResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5223'

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    console.log('Fetching destinations from API:', `${API_BASE}/api/destinations`)
    const { data } = await axios.get(`${API_BASE}/api/destinations`, { timeout: 5000 })
    console.log('API response:', data)
    // Transform backend data to match frontend types
    return data.map((dest: any) => ({
      ...dest,
      highlights: typeof dest.highlights === 'string' ? JSON.parse(dest.highlights) : dest.highlights
    }))
  } catch (error) {
    console.warn('API failed, using fallback data:', error)
    // Fallback sample data if backend not running
    const res = await fetch('/sample-data/destinations.json')
    const fallbackData = await res.json()
    console.log('Using fallback data:', fallbackData)
    return fallbackData
  }
}

export async function fetchAvailability(destinationId: number, startDate: string, endDate: string): Promise<AvailabilityResponse> {
  const { data } = await axios.get(`${API_BASE}/api/availability`, {
    params: { destinationId, startDate, endDate }
  })
  return data
}

export async function createBooking(payload: BookingRequest): Promise<BookingResponse> {
  const { data } = await axios.post(`${API_BASE}/api/book`, payload)
  return data
}



