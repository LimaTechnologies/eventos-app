"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, List, Flame } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/festival-cupim",
      icon: Flame,
      label: "Festival do Cupim",
      active: pathname === "/festival-cupim",
      alwaysRed: true,
    },
    {
      href: "/",
      icon: Home,
      label: "Menu",
      active: pathname === "/",
    },
    {
      href: "/calendario",
      icon: Calendar,
      label: "Calendário",
      active: pathname === "/calendario",
    },
    {
      href: "/eventos",
      icon: List,
      label: "Todos os eventos",
      active: pathname === "/eventos",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex w-full">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = item.active
          const isAlwaysRed = item.alwaysRed

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors ${
                index > 0 ? "border-l border-gray-200" : ""
              } ${
                isActive
                  ? isAlwaysRed
                    ? "text-red-600 bg-red-50"
                    : "text-blue-600 bg-blue-50"
                  : isAlwaysRed
                    ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
