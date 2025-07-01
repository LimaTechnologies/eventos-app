"use client"

import { useState } from "react"
import Image from "next/image"
import type { Event } from "@/types/event"
import { useEvents } from "@/contexts/events-context"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventModal } from "./event-modal"

interface EventListProps {
  events: Event[]
  variant?: "zigzag" | "normal"
}

export function EventList({ events, variant = "normal" }: EventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const { isEventPast, isEventHappening } = useEvents()

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum evento encontrado</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {events.map((event, index) => {
          const isPast = isEventPast(event)
          const happening = isEventHappening(event)
          const isEven = index % 2 === 0
          const imageOnLeft = variant === "zigzag" ? isEven : true
          const isFinished = isPast && !happening

          return (
            <div
              key={event.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${isFinished ? "grayscale opacity-60" : ""
                } ${happening ? "ring-2 ring-green-500 ring-opacity-50" : ""}`}
            >
              <div className={`flex ${variant === "zigzag" && !imageOnLeft ? "flex-row-reverse" : ""}`}>
                <div
                  className="flex w-32 h-full relative cursor-pointer"
                  onClick={
                    () => {
                      setSelectedEvent(event)
                    }
                  }

                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                  {/* Indicadores de status */}
                  {happening && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                        Ao vivo
                      </span>
                    </div>
                  )}
                  {isFinished && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Finalizado
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3
                      className={`font-bold text-lg mb-2 line-clamp-2 ${isFinished ? "text-gray-500" : "text-gray-900"}`}
                    >
                      {event.title}
                    </h3>
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className={isFinished ? "text-gray-400" : "text-gray-600"}>
                          {event.date.toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className={isFinished ? "text-gray-400" : "text-gray-600"}>
                          {happening ? "Acontecendo agora" : event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className={`${isFinished ? "text-gray-400" : "text-gray-600"} line-clamp-1`}>
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)} className="self-start">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <EventModal event={selectedEvent!} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
