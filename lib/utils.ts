import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getRelativeTime(date: string | Date) {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInMins = Math.floor(diffInMs / 60000)
  const diffInHours = Math.floor(diffInMs / 3600000)
  const diffInDays = Math.floor(diffInMs / 86400000)

  if (diffInMins < 1) return 'just now'
  if (diffInMins < 60) return `${diffInMins}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  return `${diffInDays}d ago`
}

export function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    case 'high':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'info':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  }
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'resolved':
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-400'
    case 'in_progress':
    case 'active':
      return 'bg-blue-500/10 text-blue-400'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-400'
    case 'failed':
    case 'error':
      return 'bg-red-500/10 text-red-400'
    default:
      return 'bg-slate-500/10 text-slate-400'
  }
}
