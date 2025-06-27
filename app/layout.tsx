import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNavigation } from "@/components/bottom-navigation"
import { EventsProvider } from "@/contexts/events-context"
import { RestaurantsProvider } from "@/contexts/restaurants-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eventos App",
  description: "Aplicativo de eventos otimizado para mobile",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <EventsProvider>
          <RestaurantsProvider>
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 relative">
              <div className="w-full min-h-screen bg-white relative">{children}</div>
            </main>
            <BottomNavigation />
          </RestaurantsProvider>
        </EventsProvider>
      </body>
    </html>
  )
}
