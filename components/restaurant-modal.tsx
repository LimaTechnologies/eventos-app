"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import type { Restaurant } from "@/types/restaurant"
import { MapPin, Clock, X, ChevronUp, ChevronDown } from "lucide-react"

interface RestaurantModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
}

export function RestaurantModal({ restaurant, isOpen, onClose }: RestaurantModalProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setShowDetails(false)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl w-[90%] h-[90%] overflow-hidden shadow-2xl relative max-w-4xl max-h-[90vh]">
        {/* Banner com cardápios ocupando todo o modal */}
        <div className="absolute inset-0">
          <Image
            src={restaurant.menuImage || "/placeholder.svg"}
            alt={`Banner com cardápios incluindo ${restaurant.name}`}
            fill
            className="object-contain bg-gray-100"
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
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 backdrop-blur-sm p-4 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-white shadow-lg"
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

        {/* Painel de detalhes deslizante */}
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
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{restaurant.name}</h2>
              <p className="text-orange-600 font-semibold text-lg">{restaurant.dish}</p>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto px-6">
              {/* Informações do restaurante */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-orange-600 font-semibold uppercase tracking-wide">Endereço</div>
                    <div className="font-bold text-gray-900 text-lg">{restaurant.address}</div>
                    <div className="text-gray-600">{restaurant.neighborhood}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                  <Clock className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-red-600 font-semibold uppercase tracking-wide">Horário</div>
                    <div className="font-bold text-gray-900 text-lg">{restaurant.schedule}</div>
                  </div>
                </div>
              </div>

              {/* Descrição do prato */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></span>
                  Sobre o prato
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed text-base">{restaurant.description}</p>
                </div>
              </div>

              {/* Informação sobre o banner */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></span>
                  Sobre este banner
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed text-base">
                    Este banner contém os cardápios e informações de vários restaurantes participantes do Festival do
                    Cupim. Você pode encontrar detalhes sobre horários, endereços e pratos especiais de cada
                    estabelecimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer do painel */}
            <div className="h-16"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
