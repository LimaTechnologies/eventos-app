import type { Event } from "@/types/event"

// Eventos reais de Araçatuba
export const events: Event[] = [
  {
    id: "1",
    title: "Cãopanheiro",
    description:
      "Evento gratuito para toda família e pets com concursos, feira de adoção, atrações musicais e muito mais",
    date: new Date("2024-12-29T08:30:00"),
    time: "08:30",
    image: "/placeholder.svg?height=200&width=300",
    location: "Praça João Pessoa",
  },
  {
    id: "2",
    title: "Domingo no Museu",
    description: "Barracas com degustação de comidas típicas e brincadeiras juninas",
    date: new Date("2025-06-08T09:00:00"),
    time: "09:00 às 11:00",
    endDate: new Date("2025-06-08T11:00:00"),
    image: "/images/domingo-museu.png",
    location: "Museu Ferroviário Moisés Joaquim Rodrigues",
  },
  {
    id: "3",
    title: "Bairro São José",
    description:
      "Contação de histórias, brincadeiras juninas, apresentação da Escola Municipal de Dança e barracas com comidas típicas",
    date: new Date("2025-06-14T16:00:00"),
    time: "16:00 às 19:00",
    endDate: new Date("2025-06-14T19:00:00"),
    image: "/images/bairro-sao-jose.png",
    location: "Praça Álvaro Carvalho Sant'Ana - São José",
  },
  {
    id: "4",
    title: "Tarde Encantada",
    description:
      "Contação de histórias 'A Fogueira de Dona Sinhá', barracas com degustação de comidas típicas e brincadeiras juninas",
    date: new Date("2025-06-21T16:00:00"),
    time: "16:00 às 18:00",
    endDate: new Date("2025-06-21T18:00:00"),
    image: "/images/tarde-encantada.png",
    location: "Biblioteca Municipal Rubens do Amaral",
  },
  {
    id: "5",
    title: "Sexta no Tom",
    description:
      "Feira gastronômica e de artesanato, show de forró com o Trio Jurubeba e intervenção espontânea de forró",
    date: new Date("2025-06-27T19:00:00"),
    time: "19:00 às 22:00",
    endDate: new Date("2025-06-27T22:00:00"),
    image: "/images/sexta-no-tom.png",
    location: "Praça João Pessoa",
  },
  {
    id: "6",
    title: "Festa Junina na Fazenda",
    description:
      "Barracas de instituições com comidas típicas, espetáculo 'Brasil no Cordel', apresentações de dança e dupla de viola caipira",
    date: new Date("2025-06-28T16:30:00"),
    time: "16:30 às 23:00",
    endDate: new Date("2025-06-28T23:00:00"),
    image: "/images/festa-junina-fazenda.png",
    location: "Parque Municipal da Fazenda",
  },
  {
    id: "7",
    title: "Bairro Alvorada",
    description:
      "Contação de histórias 'A Fogueira de Dona Sinhá', apresentação da Escola Municipal de Dança, barracas com comidas típicas e apresentação da Orquestra Popular de Música Caipira",
    date: new Date("2025-06-29T16:00:00"),
    time: "16:00 às 19:00",
    endDate: new Date("2025-06-29T19:00:00"),
    image: "/images/bairro-alvorada.png",
    location: "Praça Bezerra de Menezes",
  },
  {
    id: "8",
    title: "O Padeiro de Santaria das Promessas",
    description: "Teatro gratuito na Praça São João",
    date: new Date("2025-06-24T19:00:00"),
    time: "19:00",
    image: "/images/agenda-junho.png",
    location: "Praça São João",
  },
  {
    id: "9",
    title: "O Recruta - Cia Pano de Chão",
    description: "Circo gratuito no Teatro São João",
    date: new Date("2025-06-25T19:00:00"),
    time: "19:00",
    image: "/images/agenda-junho.png",
    location: "Teatro São João",
  },
  {
    id: "10",
    title: "Histórias da Mata - Lugar de Ser Qualquer",
    description: "Espetáculo infantil gratuito na Praça São João",
    date: new Date("2025-06-26T10:00:00"),
    time: "10:00",
    image: "/images/agenda-junho.png",
    location: "Praça São João",
  },
  {
    id: "11",
    title: "Reciclow - Raros Circus",
    description: "Circo gratuito no Teatro São João",
    date: new Date("2025-06-26T14:00:00"),
    time: "14:00",
    image: "/images/agenda-junho.png",
    location: "Teatro São João",
  },
  {
    id: "12",
    title: "Um Conto Chamado Circo",
    description: "Circo gratuito no Teatro São João",
    date: new Date("2025-06-27T19:00:00"),
    time: "19:00",
    image: "/images/agenda-junho.png",
    location: "Teatro São João",
  },
  {
    id: "13",
    title: "O Internationale Cirque Du Jonzé",
    description: "Circo gratuito na Praça São João",
    date: new Date("2025-06-28T16:00:00"),
    time: "16:00",
    image: "/images/agenda-junho.png",
    location: "Praça São João",
  },
  {
    id: "14",
    title: "Todo Circo Tem - Escola de Palhaços",
    description: "Circo gratuito no Teatro São João",
    date: new Date("2025-06-28T19:00:00"),
    time: "19:00",
    image: "/images/agenda-junho.png",
    location: "Teatro São João",
  },
  {
    id: "15",
    title: "Detestinha - Cia Pano de Chão",
    description: "Espetáculo infantil gratuito no Teatro São João",
    date: new Date("2025-06-29T16:00:00"),
    time: "16:00",
    image: "/images/agenda-junho.png",
    location: "Teatro São João",
  },
  {
    id: "15",
    title: "Jogo do AEA x NOROESTE",
    description: "Partida de futebol da copa paulista (terceira rodada)",
    date: new Date("2025-06-27T20:00:00"),
    time: "20:00",
    image: "/images/aea.jpg",
    location: "Estádio Municipal Adhemar de Barros",
  }
]

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
