import type { Event } from "@/types/event"
import eventsJSON from "./events.json"
// Dados dos eventos separados da lógica
export const events: Event[] = eventsJSON.map((event) => ({
    ...event,
    date: new Date(event.date),
    endDate: event.endDate ? new Date(event.endDate) : undefined
}))

export function getNextEvent(): Event | null {
  const now = new Date()
  const futureEvents = events.filter((event) => event.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime())

  return futureEvents[0] || null
}

export function getEventsForDate(date: Date): Event[] {
  return events
    .filter((event) => {
      // Compara apenas o dia, mês e ano (ignora a hora)
      const eventDate = new Date(event.date)
      const compareDate = new Date(date)
      return (
        eventDate.getDate() === compareDate.getDate() &&
        eventDate.getMonth() === compareDate.getMonth() &&
        eventDate.getFullYear() === compareDate.getFullYear()
      )
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime()) // Ordena por horário do dia
}

export function getTodayEvents(): Event[] {
  const today = new Date()
  return getEventsForDate(today)
}

export function getTomorrowEvents(): Event[] {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getEventsForDate(tomorrow)
}

export function getAllEventsSorted(): Event[] {
  const now = new Date()
  return events.sort((a, b) => {
    // Eventos futuros primeiro, depois passados
    const aIsFuture = a.date >= now
    const bIsFuture = b.date >= now

    if (aIsFuture && !bIsFuture) return -1
    if (!aIsFuture && bIsFuture) return 1

    // Se ambos são futuros ou passados, ordena por data
    return aIsFuture ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime()
  })
}

export function isEventPast(event: Event): boolean {
  const now = new Date()
  return event.date < now
}

export function isEventHappening(event: Event): boolean {
  if (!event.endDate) return false
  const now = new Date()
  return now >= event.date && now <= event.endDate
}

export function areAllTodayEventsPast(): boolean {
  const todayEvents = getTodayEvents()
  if (todayEvents.length === 0) return false
  return todayEvents.every((event) => isEventPast(event))
}
