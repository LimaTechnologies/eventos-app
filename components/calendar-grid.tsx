"use client"

import { useState } from "react"
import { events } from "@/lib/events"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarGridProps {
  onDateSelect: (date: Date) => void
  selectedDate?: Date
}

export function CalendarGrid({ onDateSelect, selectedDate }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsCount = (day: number) => {
    const date = new Date(year, month, day)
    return events.filter((event) => event.date.toDateString() === date.toDateString()).length
  }

  const hasEvent = (day: number) => {
    return getEventsCount(day) > 0
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(year, month, day)
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day)
    onDateSelect(date)
  }

  // Criar array de dias para renderizar
  const calendarDays = []

  // Dias vazios do mês anterior
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Dias do mês atual
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 w-full max-w-sm mx-auto">
      {/* Header do calendário */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-base font-semibold">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Grade do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                className={`w-full h-full flex flex-col items-center justify-center text-sm rounded-lg transition-colors relative p-1 min-h-[40px] ${
                  isSelected(day)
                    ? "bg-blue-600 text-white"
                    : hasEvent(day)
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{day}</span>
                {hasEvent(day) && (
                  <span className={`text-xs font-bold ${isSelected(day) ? "text-white/80" : "text-blue-600"}`}>
                    {getEventsCount(day)}
                  </span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
