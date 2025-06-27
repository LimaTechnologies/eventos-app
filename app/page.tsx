"use client"

import { useState } from "react"
import Link from "next/link"
import { EventBanner } from "@/components/event-banner"
import { EventList } from "@/components/event-list"
import { useEvents } from "@/contexts/events-context"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  const [showTomorrowEvents, setShowTomorrowEvents] = useState(false)
  const { getNextEvent, getTodayEvents, getTomorrowEvents, areAllTodayEventsPast, loading } = useEvents()

  const nextEvent = getNextEvent()
  const todayEvents = getTodayEvents()
  const tomorrowEvents = getTomorrowEvents()
  const allTodayEventsPast = areAllTodayEventsPast()
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const eventsToShow = showTomorrowEvents ? tomorrowEvents : todayEvents
  const sectionTitle = showTomorrowEvents
    ? `Eventos de amanhã (${tomorrow.toLocaleDateString("pt-BR")})`
    : todayEvents.length > 0
      ? "Eventos de hoje"
      : `Eventos para o dia ${today.toLocaleDateString("pt-BR")}`

  const handleShowTomorrowEvents = () => {
    setShowTomorrowEvents(true)
  }

  const handleBackToToday = () => {
    setShowTomorrowEvents(false)
  }

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
      {nextEvent && (
        <div className="px-4 pt-4">
          <EventBanner event={nextEvent} showCountdown />
        </div>
      )}

      <div className="px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
        </div>

        {(todayEvents.length > 0 || tomorrowEvents.length > 0) && (
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={!showTomorrowEvents ? "default" : "outline"}
              size="sm"
              onClick={handleBackToToday}
              className={!showTomorrowEvents ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              📅 Hoje
            </Button>
            {tomorrowEvents.length > 0 && (
              <Button
                variant={showTomorrowEvents ? "default" : "outline"}
                size="sm"
                onClick={handleShowTomorrowEvents}
                className={showTomorrowEvents ? "bg-green-600 hover:bg-green-700" : ""}
              >
                🌅 Amanhã
              </Button>
            )}
          </div>
        )}

        {eventsToShow.length > 0 ? (
          <div className="space-y-6">
            <EventList events={eventsToShow} variant="normal" />

            {!showTomorrowEvents && allTodayEventsPast && tomorrowEvents.length > 0 && (
              <div className="text-center">
                <Button
                  onClick={handleShowTomorrowEvents}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 shadow-lg"
                >
                  🌅 Ver eventos de amanhã ({tomorrow.toLocaleDateString("pt-BR")})
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-gray-600 font-medium">
                {showTomorrowEvents ? "Nenhum evento programado para amanhã" : "Nenhum evento programado para hoje"}
              </p>
              <p className="text-gray-500 text-sm mt-1">Confira os próximos eventos abaixo</p>
            </div>

            {!showTomorrowEvents && tomorrowEvents.length > 0 && (
              <div className="text-center">
                <Button
                  onClick={handleShowTomorrowEvents}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 shadow-lg"
                >
                  🌅 Ver eventos de amanhã ({tomorrow.toLocaleDateString("pt-BR")})
                </Button>
              </div>
            )}

            {nextEvent && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Próximo evento:</h3>
                <EventList events={[nextEvent]} variant="normal" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão para ir ao calendário - corrigido com Link */}
      <div className="px-4 pb-4">
        <Link href="/calendario">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            📅 Ver Calendário Completo
          </Button>
        </Link>
      </div>
    </div>
  )
}
