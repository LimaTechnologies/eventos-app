"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import type { Event } from "@/types/event"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { isEventPast, isEventHappening } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { EventModal } from "./event-modal"

interface EventCarouselProps {
  events: Event[]
}

export function EventCarousel({ events }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Ordena eventos cronologicamente: passados primeiro (mais recente primeiro), depois futuros
  const sortedEvents = [...events].sort((a, b) => {
    const now = new Date()
    const aIsPast = isEventPast(a)
    const bIsPast = isEventPast(b)

    // Se um é passado e outro futuro
    if (aIsPast && !bIsPast) return -1 // Passados vêm primeiro (esquerda)
    if (!aIsPast && bIsPast) return 1 // Futuros vêm depois (direita)

    // Se ambos são passados, mais recente primeiro
    if (aIsPast && bIsPast) return b.date.getTime() - a.date.getTime()

    // Se ambos são futuros, mais próximo primeiro
    return a.date.getTime() - b.date.getTime()
  })

  // Encontra o índice do primeiro evento futuro para começar ali
  const firstFutureIndex = sortedEvents.findIndex((event) => !isEventPast(event))

  // Define o índice inicial como o primeiro evento futuro, ou o último se não houver futuros
  useEffect(() => {
    if (firstFutureIndex !== -1) {
      setCurrentIndex(firstFutureIndex)
      scrollToIndex(firstFutureIndex)
    } else if (sortedEvents.length > 0) {
      setCurrentIndex(sortedEvents.length - 1)
      scrollToIndex(sortedEvents.length - 1)
    }
  }, [firstFutureIndex, sortedEvents.length])

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280 // largura do card + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth - scrollRef.current.clientWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      })
    }
    setCurrentIndex(index)
  }

  const nextEvent = () => {
    if (currentIndex < sortedEvents.length - 1) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const prevEvent = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  if (sortedEvents.length === 0) return null

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold">Navegação Cronológica</h3>
            <p className="text-blue-100 text-sm">Passados ← | → Futuros</p>
          </div>
        </div>

        {/* Setas de navegação nas laterais */}
        <button
          onClick={prevEvent}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={nextEvent}
          disabled={currentIndex === sortedEvents.length - 1}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Carousel */}
        <div className="p-6">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sortedEvents.map((event, index) => {
              const isPast = isEventPast(event)
              const happening = isEventHappening(event)
              const isActive = index === currentIndex

              return (
                <div
                  key={event.id}
                  className={`flex-shrink-0 w-64 bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  } ${isPast ? "opacity-75" : ""} ${happening ? "ring-2 ring-green-500 ring-opacity-50" : ""}`}
                  onClick={() => scrollToIndex(index)}
                >
                  {/* Imagem */}
                  <div className="relative h-32 overflow-hidden rounded-t-xl">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    {isPast && !happening && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Finalizado
                        </span>
                      </div>
                    )}
                    {happening && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                          Ao vivo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4">
                    <h4
                      className={`font-bold text-lg mb-2 line-clamp-2 ${isPast && !happening ? "text-gray-500" : "text-gray-900"}`}
                    >
                      {event.title}
                    </h4>

                    {/* Informações do evento */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className={isPast && !happening ? "text-gray-400" : "text-gray-600"}>
                          {event.date.toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className={isPast && !happening ? "text-gray-400" : "text-gray-600"}>
                          {happening ? "Acontecendo agora" : event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className={`${isPast && !happening ? "text-gray-400" : "text-gray-600"} line-clamp-1`}>
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Countdown ou Status */}
                    {isPast && !happening ? (
                      <div className="text-center py-3 bg-gray-100 rounded-lg mb-3">
                        <span className="text-gray-500 font-medium">Evento Finalizado</span>
                      </div>
                    ) : happening ? (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3">
                        <div className="text-center mb-2">
                          <span className="text-sm font-semibold text-green-700">Termina em</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <CountdownMini targetDate={event.endDate!} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
                        <div className="text-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">Faltam</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <CountdownMini targetDate={event.date} />
                        </div>
                      </div>
                    )}

                    {/* Botão Ver Detalhes */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedEvent(event)
                      }}
                      className="w-full"
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 gap-2">
            {sortedEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent!} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}

// Componente de countdown mini para o carousel - cada instância é independente
function CountdownMini({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    // Função para calcular o tempo restante
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        }
      } else {
        return { days: 0, hours: 0, minutes: 0 }
      }
    }

    // Calcula imediatamente
    setTimeLeft(calculateTimeLeft())

    // Configura o timer
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [targetDate]) // Dependência na targetDate específica

  return (
    <>
      <div className="text-center">
        <div className="bg-white rounded-lg p-2 min-w-[40px] border border-gray-200">
          <div className="text-lg font-bold text-blue-600">{timeLeft.days}</div>
        </div>
        <div className="text-xs text-gray-600 mt-1">Dias</div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-2 min-w-[40px] border border-gray-200">
          <div className="text-lg font-bold text-blue-600">{timeLeft.hours}</div>
        </div>
        <div className="text-xs text-gray-600 mt-1">Hrs</div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-2 min-w-[40px] border border-gray-200">
          <div className="text-lg font-bold text-blue-600">{timeLeft.minutes}</div>
        </div>
        <div className="text-xs text-gray-600 mt-1">Min</div>
      </div>
    </>
  )
}
