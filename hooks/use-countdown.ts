"use client"

import { useState, useEffect } from "react"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface UseCountdownProps {
  targetDate: Date
  endDate?: Date
  isHappening?: boolean
}

export function useCountdown({ targetDate, endDate, isHappening = false }: UseCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = isHappening && endDate ? endDate.getTime() : targetDate.getTime()
      const distance = target - now

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        }
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    // Calcula imediatamente
    setTimeLeft(calculateTimeLeft())

    // Configura o timer
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [targetDate, endDate, isHappening])

  return timeLeft
}
