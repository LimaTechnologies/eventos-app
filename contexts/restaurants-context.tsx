"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Restaurant } from "@/types/restaurant"
import { restaurants as initialRestaurants } from "@/lib/restaurants-data"

interface RestaurantsContextType {
  restaurants: Restaurant[]
  loading: boolean
  error: string | null
  // Getters
  getRestaurantById: (id: string) => Restaurant | null
  getRestaurantsByNeighborhood: (neighborhood: string) => Restaurant[]
  searchRestaurants: (query: string) => Restaurant[]
  // Actions
  refreshRestaurants: () => void
}

const RestaurantsContext = createContext<RestaurantsContextType | undefined>(undefined)

interface RestaurantsProviderProps {
  children: ReactNode
}

export function RestaurantsProvider({ children }: RestaurantsProviderProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRestaurantById = (id: string): Restaurant | null => {
    return restaurants.find((restaurant) => restaurant.id === id) || null
  }

  const getRestaurantsByNeighborhood = (neighborhood: string): Restaurant[] => {
    return restaurants.filter((restaurant) =>
      restaurant.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()),
    )
  }

  const searchRestaurants = (query: string): Restaurant[] => {
    const lowercaseQuery = query.toLowerCase()
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery) ||
        restaurant.dish.toLowerCase().includes(lowercaseQuery) ||
        restaurant.neighborhood.toLowerCase().includes(lowercaseQuery) ||
        restaurant.address.toLowerCase().includes(lowercaseQuery),
    )
  }

  const refreshRestaurants = () => {
    setLoading(true)
    setTimeout(() => {
      setRestaurants([...initialRestaurants])
      setLoading(false)
    }, 500)
  }

  const contextValue: RestaurantsContextType = {
    restaurants,
    loading,
    error,
    getRestaurantById,
    getRestaurantsByNeighborhood,
    searchRestaurants,
    refreshRestaurants,
  }

  return <RestaurantsContext.Provider value={contextValue}>{children}</RestaurantsContext.Provider>
}

export function useRestaurants() {
  const context = useContext(RestaurantsContext)
  if (context === undefined) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider")
  }
  return context
}
