'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { Bell, MapPin, Filter } from 'lucide-react'
import { getSeverityColor, getRelativeTime } from '@/lib/utils'

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/data/alerts.json').then(r => r.json()).then(setAlerts)
  }, [])

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter((a: any) => a.type === filter)

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="mt-2 text-slate-400">Stay informed about city updates and alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Alerts</option>
              <option value="air_quality">Air Quality</option>
              <option value="traffic">Traffic</option>
              <option value="utility">Utility</option>
              <option value="health">Health</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert: any) => (
            <div key={alert.id} className="card hover:scale-[1.01] transition-transform">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${getSeverityColor(alert.severity)}`}>
                  <Bell className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                    <span className={`badge shrink-0 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-3">{alert.message}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {alert.zone}
                    </span>
                    <span>{getRelativeTime(alert.time)}</span>
                    <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                  </div>
                  {alert.actionable && (
                    <button className="mt-4 btn-primary text-sm">
                      {alert.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
