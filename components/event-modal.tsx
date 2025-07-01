"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import type { Event } from "@/types/event"
import { Calendar, Clock, MapPin, X, ChevronUp, ChevronDown } from "lucide-react"

interface EventModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = "hidden"
    } else {
      // Restaura scroll do body quando modal fecha
      document.body.style.overflow = "unset"
      setShowDetails(false) // Reset details quando modal fecha
    }

    // Cleanup quando componente desmonta
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl w-[90%] h-[90%] overflow-hidden shadow-2xl relative max-w-4xl max-h-[90vh]">
        {/* Imagem de fundo ocupando todo o modal */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={300}
            height={400}
            className="object-contain w-[70%] h-full"
          />
        </div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 shadow-lg backdrop-blur-sm z-30"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Botão Ver Detalhes (canto inferior) */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 backdrop-blur-sm p-4 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-white shadow-lg"
          >
            {showDetails ? (
              <>
                <ChevronDown className="w-5 h-5" />
                Ocultar Detalhes
              </>
            ) : (
              <>
                <ChevronUp className="w-5 h-5" />
                Ver Detalhes
              </>
            )}
          </button>
        </div>

        {/* Painel de detalhes deslizante (de baixo para cima) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-10 rounded-t-2xl ${
            showDetails ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "70%" }}
        >
          <div className="h-full flex flex-col">
            {/* Handle visual */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header do painel */}
            <div className="px-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{event.title}</h2>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto px-6">
              {/* Informações do evento */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Data</div>
                    <div className="font-bold text-gray-900 text-lg">
                      {event.date.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-green-600 font-semibold uppercase tracking-wide">Horário</div>
                    <div className="font-bold text-gray-900 text-lg">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-purple-600 font-semibold uppercase tracking-wide">Local</div>
                    <div className="font-bold text-gray-900 text-lg">{event.location}</div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  Sobre o evento
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed text-base">{event.description}</p>
                </div>
              </div>
            </div>

            {/* Footer do painel com padding para o botão */}
            <div className="h-16"></div>
          </div>
        </div>
      </div>
    </div>
  )

  // Renderiza o modal usando portal para garantir que fique no topo da DOM
  return createPortal(modalContent, document.body)
}
