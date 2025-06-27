"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Event } from "@/types/event"
import { events as initialEvents } from "@/lib/events-data"

interface EventsContextType {
  events: Event[]
  loading: boolean
  error: string | null
  // Getters
  getNextEvent: () => Event | null
  getEventsForDate: (date: Date) => Event[]
  getTodayEvents: () => Event[]
  getTomorrowEvents: () => Event[]
  getAllEventsSorted: () => Event[]
  // Checkers
  isEventPast: (event: Event) => boolean
  isEventHappening: (event: Event) => boolean
  areAllTodayEventsPast: () => boolean
  // Actions
  refreshEvents: () => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

interface EventsProviderProps {
  children: ReactNode
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Utility functions
  const isEventPast = (event: Event): boolean => {
    const now = new Date()
    return event.date < now
  }

  const isEventHappening = (event: Event): boolean => {
    if (!event.endDate) return false
    const now = new Date()
    return now >= event.date && now <= event.endDate
  }

  const getNextEvent = (): Event | null => {
    const now = new Date()
    const futureEvents = events.filter((event) => event.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime())

    return futureEvents[0] || null
  }

  const getEventsForDate = (date: Date): Event[] => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date)
        const compareDate = new Date(date)
        return (
          eventDate.getDate() === compareDate.getDate() &&
          eventDate.getMonth() === compareDate.getMonth() &&
          eventDate.getFullYear() === compareDate.getFullYear()
        )
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const getTodayEvents = (): Event[] => {
    const today = new Date()
    return getEventsForDate(today)
  }

  const getTomorrowEvents = (): Event[] => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return getEventsForDate(tomorrow)
  }

  const getAllEventsSorted = (): Event[] => {
    const now = new Date()
    return [...events].sort((a, b) => {
      const aIsFuture = a.date >= now
      const bIsFuture = b.date >= now

      if (aIsFuture && !bIsFuture) return -1
      if (!aIsFuture && bIsFuture) return 1

      return aIsFuture ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime()
    })
  }

  const areAllTodayEventsPast = (): boolean => {
    const todayEvents = getTodayEvents()
    if (todayEvents.length === 0) return false
    return todayEvents.every((event) => isEventPast(event))
  }

  const refreshEvents = () => {
    setLoading(true)
    // Simula refresh dos dados
    setTimeout(() => {
      setEvents([...initialEvents])
      setLoading(false)
    }, 500)
  }

  const contextValue: EventsContextType = {
    events,
    loading,
    error,
    getNextEvent,
    getEventsForDate,
    getTodayEvents,
    getTomorrowEvents,
    getAllEventsSorted,
    isEventPast,
    isEventHappening,
    areAllTodayEventsPast,
    refreshEvents,
  }

  return <EventsContext.Provider value={contextValue}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider")
  }
  return context
}
