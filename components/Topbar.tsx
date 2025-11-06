'use client'
import { Bell, Menu, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Topbar() {
  const [user, setUser] = useState<any>(null)
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('current_user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl px-4 shadow-lg sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-slate-400 lg:hidden">
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-slate-800 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-white">Welcome back, {user?.name || 'User'}</h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="relative -m-2.5 p-2.5 text-slate-400 hover:text-white transition-colors">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-800" aria-hidden="true" />

          <div className="relative flex items-center gap-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden lg:flex lg:items-center">
              <span className="text-sm font-semibold leading-6 text-white" aria-hidden="true">
                {user?.name || 'User'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
