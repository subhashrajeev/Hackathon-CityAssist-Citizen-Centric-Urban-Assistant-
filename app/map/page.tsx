'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { MapPin, AlertCircle, Activity, Phone, Navigation2, ZoomIn, ZoomOut, Layers } from 'lucide-react'
import { getSeverityColor } from '@/lib/utils'

export default function MapPage() {
  const [incidents, setIncidents] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [sensors, setSensors] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showIncidents, setShowIncidents] = useState(true)
  const [showServices, setShowServices] = useState(true)
  const [showSensors, setShowSensors] = useState(true)

  useEffect(() => {
    fetch('/data/incidents.json').then(r => r.json()).then(setIncidents)
    fetch('/data/services.json').then(r => r.json()).then(setServices)
    fetch('/data/sensors.json').then(r => r.json()).then(setSensors)
  }, [])

  const getMarkerPosition = (lat: number, lng: number) => {
    // Convert lat/lng to percentage positions on our map
    // Normalize around New York coordinates (40.7128, -74.0060)
    const baseLatitude = 40.7128
    const baseLongitude = -74.0060

    const latRange = 0.05 // About 5.5 km range
    const lngRange = 0.07

    const x = ((lng - (baseLongitude - lngRange/2)) / lngRange) * 100
    const y = ((baseLatitude + latRange/2 - lat) / latRange) * 100

    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">City Map</h1>
            <p className="mt-2 text-slate-400">Interactive view of incidents, sensors, and services</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2">
              <Navigation2 className="h-4 w-4" />
              My Location
            </button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="btn-secondary">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="btn-secondary">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Layers
            </button>
          </div>

          {/* Layer Toggles */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showIncidents}
                onChange={() => setShowIncidents(!showIncidents)}
                className="rounded border-slate-600 bg-slate-700 text-red-600"
              />
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              Incidents ({incidents.length})
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showServices}
                onChange={() => setShowServices(!showServices)}
                className="rounded border-slate-600 bg-slate-700 text-emerald-600"
              />
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              Services ({services.length})
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showSensors}
                onChange={() => setShowSensors(!showSensors)}
                className="rounded border-slate-600 bg-slate-700 text-blue-600"
              />
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              Sensors ({sensors.length})
            </label>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 h-[600px]">
          {/* Grid Background - City Map Style */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #334155 1px, transparent 1px),
                linear-gradient(to bottom, #334155 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
            {/* Major roads */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-slate-600"></div>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-600"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-slate-600"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-slate-600"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-600"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-slate-600"></div>
          </div>

          {/* Zone Labels */}
          <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300">
            Downtown
          </div>
          <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300">
            North District
          </div>
          <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300">
            South Park
          </div>
          <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300">
            East Side
          </div>

          {/* Incident Markers */}
          {showIncidents && incidents.map((incident) => {
            const pos = getMarkerPosition(incident.location.lat, incident.location.lng)
            const isSelected = selectedItem?.id === incident.id

            return (
              <button
                key={incident.id}
                onClick={() => setSelectedItem(incident)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                  isSelected ? 'scale-150 z-50' : 'z-10'
                }`}
                style={pos}
                title={incident.title}
              >
                <div className={`relative ${
                  incident.severity === 'critical' ? 'animate-pulse' : ''
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-lg ${
                    incident.severity === 'critical' ? 'bg-red-500' :
                    incident.severity === 'high' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`}>
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  {isSelected && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                      <h4 className="font-semibold text-white text-sm">{incident.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{incident.description}</p>
                      <div className={`mt-2 text-xs px-2 py-1 rounded ${getSeverityColor(incident.severity)}`}>
                        {incident.severity} priority
                      </div>
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {/* Service Markers */}
          {showServices && services.map((service) => {
            const pos = getMarkerPosition(service.location.lat, service.location.lng)
            const isSelected = selectedItem?.id === service.id

            return (
              <button
                key={service.id}
                onClick={() => setSelectedItem(service)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                  isSelected ? 'scale-150 z-50' : 'z-10'
                }`}
                style={pos}
                title={service.name}
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  {isSelected && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                      <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{service.address}</p>
                      <p className="text-xs text-slate-500 mt-1">{service.hours}</p>
                      <a
                        href={`tel:${service.phone}`}
                        className="mt-2 flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-3 w-3" />
                        {service.phone}
                      </a>
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {/* Sensor Markers */}
          {showSensors && sensors.map((sensor) => {
            const pos = getMarkerPosition(sensor.location.lat, sensor.location.lng)
            const isSelected = selectedItem?.id === sensor.id

            return (
              <button
                key={sensor.id}
                onClick={() => setSelectedItem(sensor)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                  isSelected ? 'scale-150 z-50' : 'z-10'
                }`}
                style={pos}
                title={sensor.label}
              >
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center shadow-lg border-2 border-blue-300">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  {isSelected && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                      <h4 className="font-semibold text-white text-sm">{sensor.label}</h4>
                      <p className="text-xs text-slate-400 mt-1">{sensor.zone}</p>
                      <div className="mt-2 text-xs">
                        <span className="text-slate-500">Type: </span>
                        <span className="text-slate-300">{sensor.type}</span>
                      </div>
                      <div className={`mt-2 text-xs px-2 py-1 rounded ${
                        sensor.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {sensor.status}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {/* Center Marker - You Are Here */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-white border-4 border-blue-500 shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Incidents</p>
                <p className="text-2xl font-bold text-white mt-1">{incidents.filter(i => i.status !== 'resolved').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Services</p>
                <p className="text-2xl font-bold text-white mt-1">{services.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Sensors</p>
                <p className="text-2xl font-bold text-white mt-1">{sensors.filter(s => s.status === 'active').length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Coverage Area</p>
                <p className="text-2xl font-bold text-white mt-1">12 km²</p>
              </div>
              <Layers className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Recent Incidents List */}
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">Recent Incidents</h2>
          <div className="space-y-3">
            {incidents.slice(0, 5).map((incident) => (
              <button
                key={incident.id}
                onClick={() => setSelectedItem(incident)}
                className="w-full flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors text-left"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  incident.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                  incident.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{incident.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{incident.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className="text-xs text-slate-500">{incident.zone}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
