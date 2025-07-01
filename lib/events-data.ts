import type { Event } from "@/types/event"
import eventsJSON from "./events.json"
// Dados dos eventos separados da lógica
export const events: Event[] = eventsJSON.map((event) => ({
    ...event,
    date: new Date(event.date),
    endDate: event.endDate ? new Date(event.endDate) : undefined
}))
