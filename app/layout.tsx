import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNavigation } from "@/components/bottom-navigation"
import { EventsProvider } from "@/contexts/events-context"
import { RestaurantsProvider } from "@/contexts/restaurants-context"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eventos Araçatuba - Sua agenda cultural completa",
  description:
    "Descubra todos os eventos públicos, festivais, shows e atividades culturais acontecendo em Araçatuba. Sua fonte completa de entretenimento e cultura na cidade.",
  keywords: [
    "eventos araçatuba",
    "agenda cultural araçatuba",
    "festivais araçatuba",
    "shows araçatuba",
    "eventos públicos",
    "cultura araçatuba",
    "entretenimento araçatuba",
    "festival do cupim",
    "eventos gratuitos",
    "programação cultural",
  ],
  authors: [{ name: "Prefeitura de Araçatuba" }],
  creator: "Prefeitura de Araçatuba",
  publisher: "Prefeitura de Araçatuba",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aracatuba.jlsite.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eventos Araçatuba - Sua agenda cultural completa",
    description:
      "Descubra todos os eventos públicos, festivais, shows e atividades culturais acontecendo em Araçatuba. Sua fonte completa de entretenimento e cultura na cidade.",
    url: "https://aracatuba.jlsite.com",
    siteName: "Eventos Araçatuba",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eventos Araçatuba - Agenda Cultural",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventos Araçatuba - Sua agenda cultural completa",
    description:
      "Descubra todos os eventos públicos, festivais, shows e atividades culturais acontecendo em Araçatuba.",
    images: ["/og-image.jpg"],
    creator: "@aracatuba_oficial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "entertainment",
  classification: "Eventos e Cultura",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    title: "Eventos Araçatuba",
    statusBarStyle: "default",
  },
  applicationName: "Eventos Araçatuba",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//blob.v0.dev" />

        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Eventos Araçatuba",
              description:
                "Descubra todos os eventos públicos, festivais, shows e atividades culturais acontecendo em Araçatuba",
              url: "https://aracatuba.jlsite.com",
              publisher: {
                "@type": "Organization",
                name: "Prefeitura de Araçatuba",
                url: "https://www.aracatuba.sp.gov.br",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://aracatuba.jlsite.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
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
