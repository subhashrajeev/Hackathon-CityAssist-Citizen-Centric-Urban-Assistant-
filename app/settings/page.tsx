'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/AppShell'
import { User, Bell, Shield, Globe } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState({
    alerts: true,
    traffic: true,
    utility: false,
    health: true
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('current_user')
      if (userData) setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-slate-400">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input type="text" className="input" value={user?.name || ''} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" className="input" value={user?.email || ''} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
              <input type="text" className="input" value={user?.role || ''} readOnly />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 cursor-pointer hover:bg-slate-800">
                <span className="text-slate-200 capitalize">{key.replace('_', ' ')} Alerts</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        </div>

        <button className="btn-primary">Save Changes</button>
      </div>
    </AppShell>
  )
}
