'use client'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'stable'
  icon?: React.ReactNode
}

export default function KPICard({ label, value, change, trend = 'stable', icon }: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4" />
    if (trend === 'down') return <ArrowDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-400'
    if (trend === 'down') return 'text-red-400'
    return 'text-slate-400'
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-sm p-6 hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className={cn('mt-2 flex items-center gap-1 text-sm font-medium', getTrendColor())}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
            {icon}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full bg-blue-500/5 blur-2xl" />
    </div>
  )
}
