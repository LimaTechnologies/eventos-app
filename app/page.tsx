"use client"

import { useEffect, useState } from "react"
import { CalendarGrid } from "@/components/calendar-grid"
import { EventList } from "@/components/event-list"
import { useEvents } from "@/contexts/events-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { getEventsForDate, loading } = useEvents()

  useEffect(() => {
    // Carrega os eventos do dia atual ao montar o componente
    const today = new Date()
    setSelectedDate(today)
    const events = getEventsForDate(today)
    setSelectedEvents(events)
    setIsLoading(false)
  }, [])

  const handleDateSelect = (date: Date) => {
    setIsLoading(true)
    setSelectedDate(date)

    setTimeout(() => {
      const events = getEventsForDate(date)
      setSelectedEvents(events)
      setIsLoading(false)
    }, 300)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-blue-600 mb-4" />
          <p className="text-gray-600">Carregando calendário...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6 relative">
      <div className="px-4 pt-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendário</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
        </div>
        <CalendarGrid onDateSelect={handleDateSelect} selectedDate={selectedDate} />
      </div>

      <div className="px-4 pb-4 relative">
        {selectedDate ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Eventos do dia {selectedDate.toLocaleDateString("pt-BR")}
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out relative ${isLoading ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                }`}
            >
              {isLoading ? (
                <div className="text-center py-8">
                  <LoadingSpinner className="text-blue-600 mb-2" />
                  <p className="text-gray-600 mt-2">Carregando eventos...</p>
                </div>
              ) : (
                <EventList events={selectedEvents} />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 transition-all duration-300 hover:border-gray-300">
            <div className="text-4xl mb-3">🗓️</div>
            <p className="text-gray-600 font-medium">Escolha um dia para ver os eventos</p>
            <p className="text-gray-500 text-sm mt-2">Toque em qualquer data do calendário acima</p>
          </div>
        )}
      </div>
    </div>
  )
}
