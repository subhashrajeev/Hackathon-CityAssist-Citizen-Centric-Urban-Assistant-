'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import KPICard from '@/components/KPICard'
import { AlertCircle, Activity, TrendingUp, Zap, MapPin, Bell, ArrowRight } from 'lucide-react'
import { getSeverityColor, getRelativeTime } from '@/lib/utils'
import Link from 'next/link'

export default function HomePage() {
  const [alerts, setAlerts] = useState([])
  const [kpis, setKPIs] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    // Fetch alerts
    fetch('/data/alerts.json').then(r => r.json()).then(setAlerts)

    // Fetch KPIs
    fetch('/data/kpis.json').then(r => r.json()).then(setKPIs)

    // Get user profile
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('current_user')
      if (userData) {
        setProfile(JSON.parse(userData))
      }
    }
  }, [])

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-500/10 via-slate-900/50 to-emerald-500/10 p-8">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {profile?.name || 'Citizen'}!
            </h1>
            <p className="mt-2 text-lg text-slate-300">Here's what's happening in your city today</p>
          </div>
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-16 translate-y-16 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        {/* KPIs */}
        {kpis && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
              label={kpis.active_incidents.label}
              value={kpis.active_incidents.value}
              change={kpis.active_incidents.change}
              trend={kpis.active_incidents.trend}
              icon={<AlertCircle className="h-6 w-6" />}
            />
            <KPICard
              label={kpis.avg_response_time.label}
              value={kpis.avg_response_time.value}
              change={kpis.avg_response_time.change}
              trend={kpis.avg_response_time.trend}
              icon={<Activity className="h-6 w-6" />}
            />
            <KPICard
              label={kpis.citizen_reports.label}
              value={kpis.citizen_reports.value}
              change={kpis.citizen_reports.change}
              trend={kpis.citizen_reports.trend}
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <KPICard
              label={kpis.city_health_index.label}
              value={kpis.city_health_index.value}
              change={kpis.city_health_index.change}
              trend={kpis.city_health_index.trend}
              icon={<Zap className="h-6 w-6" />}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/report" className="group card hover:scale-105 hover:glow cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <AlertCircle className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Report Issue</h3>
                <p className="text-sm text-slate-400">Report a civic problem</p>
              </div>
            </div>
          </Link>

          <Link href="/map" className="group card hover:scale-105 hover:glow cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-3">
                <MapPin className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">View Map</h3>
                <p className="text-sm text-slate-400">Explore city services</p>
              </div>
            </div>
          </Link>

          <Link href="/status" className="group card hover:scale-105 hover:glow cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-500/10 p-3">
                <Activity className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Service Status</h3>
                <p className="text-sm text-slate-400">Check utility status</p>
              </div>
            </div>
          </Link>

          <Link href="/services" className="group card hover:scale-105 hover:glow cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-3">
                <Bell className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Local Services</h3>
                <p className="text-sm text-slate-400">Find nearby facilities</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Alerts Feed */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Alerts</h2>
            <Link href="/notifications" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {alerts.slice(0, 5).map((alert: any) => (
              <div
                key={alert.id}
                className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/30 p-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-2 ${getSeverityColor(alert.severity)}`}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{alert.message}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.zone}
                          </span>
                          <span>{getRelativeTime(alert.time)}</span>
                        </div>
                      </div>
                      <span className={`badge shrink-0 ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    {alert.actionable && (
                      <button className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        {alert.action} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
