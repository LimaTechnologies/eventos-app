"use client"

import { useState } from "react"
import Image from "next/image"
import { useRestaurants } from "@/contexts/restaurants-context"
import { RestaurantModal } from "@/components/restaurant-modal"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MapPin, Clock } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

export default function FestivalCupimPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const { restaurants, loading } = useRestaurants()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-orange-600 mb-4" />
          <p className="text-gray-600">Carregando restaurantes...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full space-y-8">
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-3ZC7nmX7EyFWigoyhAo6FlLVv67ZXu.jpeg"
            alt="1º Festival do Cupim Casqueirado"
            width={800}
            height={600}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="px-4 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Festival do Cupim</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-3">17 de junho a 3 de agosto</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GDzIYFEukolBqyYl2UQOPBFJEVCKui.png"
              alt="Informações do Festival"
              width={800}
              height={400}
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">História do Cupim Casqueirado</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              O cupim casqueirado foi criado em 1989 e reconhecido por lei como prato típico de Araçatuba em 2010. Ao
              longo dos anos, o prato se tornou símbolo da gastronomia local e levou nossa cultura para além dos limites
              do município.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Restaurantes Participantes</h2>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-32 h-32">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.dish}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-gray-900">{restaurant.name}</h3>
                        <p className="text-orange-600 font-semibold mb-2">{restaurant.dish}</p>
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-orange-600" />
                            <span className="text-gray-600 line-clamp-1">{restaurant.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-gray-600 line-clamp-1">{restaurant.schedule}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRestaurant(restaurant)}
                        className="self-start border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        Ver banner
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GDzIYFEukolBqyYl2UQOPBFJEVCKui.png"
              alt="Banner Festival do Cupim"
              width={800}
              height={400}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>

      <RestaurantModal
        restaurant={selectedRestaurant!}
        isOpen={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </>
  )
}
