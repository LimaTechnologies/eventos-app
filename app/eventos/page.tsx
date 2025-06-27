"use client"

import { EventList } from "@/components/event-list"
import { EventCarousel } from "@/components/event-carousel"
import { useEvents } from "@/contexts/events-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function EventosPage() {
  const { getAllEventsSorted, loading } = useEvents()
  const allEvents = getAllEventsSorted()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-blue-600 mb-4" />
          <p className="text-gray-600">Carregando eventos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      <div className="px-4 pt-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Eventos</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-3">Confira toda a programação disponível</p>
        </div>
      </div>

      <div className="px-4">
        <EventCarousel events={allEvents} />
      </div>

      <div className="px-4 pb-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lista Completa</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
        </div>
        <EventList events={allEvents} />
      </div>
    </div>
  )
}
