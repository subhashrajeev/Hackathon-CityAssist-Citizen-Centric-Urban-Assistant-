'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { MapPin, Navigation } from 'lucide-react'

export default function MapPage() {
  const [incidents, setIncidents] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch('/data/incidents.json').then(r => r.json()).then(setIncidents)
    fetch('/data/services.json').then(r => r.json()).then(setServices)
  }, [])

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">City Map</h1>
          <p className="mt-2 text-slate-400">View incidents, sensors, and services across the city</p>
        </div>

        {/* Map Placeholder - In production, this would use react-leaflet */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 h-[500px] flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
            <p className="text-slate-400 mb-4">Install dependencies to enable map visualization</p>
            <code className="text-sm bg-slate-800 px-4 py-2 rounded text-blue-400">
              npm install leaflet react-leaflet
            </code>
          </div>
        </div>

        {/* Legend */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-300">Critical Incidents</span>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-slate-300">High Priority</span>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-slate-300">Active Sensors</span>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-300">Services</span>
            </div>
          </div>
        </div>

        {/* Nearby Services */}
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">Nearby Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.slice(0, 6).map((service: any) => (
              <div key={service.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{service.address}</p>
                  <p className="text-xs text-slate-500 mt-1">{service.hours}</p>
                </div>
                <a href={`tel:${service.phone}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
