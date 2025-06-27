"use client"
import { useState } from "react"
import Image from "next/image"
import type { Event } from "@/types/event"
import { Countdown } from "./countdown"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventModal } from "./event-modal"
import { useEvents } from "@/contexts/events-context"

interface EventBannerProps {
  event: Event
  showCountdown?: boolean
}

export function EventBanner({ event, showCountdown = false }: EventBannerProps) {
  const [showModal, setShowModal] = useState(false)
  const { isEventHappening } = useEvents()
  const happening = isEventHappening(event)

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl w-full max-h-[70%]">
        <div className="absolute inset-0 opacity-20">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative p-6">
          <div className="mb-4 text-center">
            <span
              className={`inline-block backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold tracking-wide ${
                happening ? "bg-green-500/30 animate-pulse" : "bg-white/20"
              }`}
            >
              {happening ? "🔴 Acontecendo Agora" : "✨ Próximo Evento"}
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-4 leading-tight text-center">{event.title}</h1>
          <p className="text-white/90 mb-6 text-base leading-relaxed line-clamp-3 text-center">{event.description}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-white/80" />
              <span className="text-sm font-semibold">{event.date.toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-sm font-semibold">{happening ? "Acontecendo agora" : event.time}</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 max-w-full">
              <MapPin className="w-4 h-4 text-white/80 flex-shrink-0" />
              <span className="text-sm font-semibold text-center truncate">{event.location}</span>
            </div>
          </div>

          {showCountdown && (
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-white/90">{happening ? "Termina em" : "Faltam apenas"}</h3>
              </div>
              <Countdown targetDate={event.date} endDate={event.endDate} isHappening={happening} />
            </div>
          )}

          <div className="text-center">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-2 transition-all duration-200"
              variant="outline"
            >
              👁️ Ver Detalhes
            </Button>
          </div>
        </div>
      </div>

      <EventModal event={event} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
