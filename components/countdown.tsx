"use client"

import { useCountdown } from "@/hooks/use-countdown"

interface CountdownProps {
  targetDate: Date
  endDate?: Date
  isHappening?: boolean
}

export function Countdown({ targetDate, endDate, isHappening = false }: CountdownProps) {
  const timeLeft = useCountdown({ targetDate, endDate, isHappening })

  const title = isHappening ? "Termina em" : "Faltam apenas"

  return (
    <div className="flex justify-center gap-4">
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[70px] border border-white/20">
          <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
        </div>
        <div className="text-sm text-white/80 mt-2 font-medium">Dias</div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[70px] border border-white/20">
          <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
        </div>
        <div className="text-sm text-white/80 mt-2 font-medium">Horas</div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[70px] border border-white/20">
          <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
        </div>
        <div className="text-sm text-white/80 mt-2 font-medium">Min</div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[70px] border border-white/20">
          <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
        </div>
        <div className="text-sm text-white/80 mt-2 font-medium">Seg</div>
      </div>
    </div>
  )
}
