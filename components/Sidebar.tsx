'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, FileText, AlertCircle, Settings, Bell, Users, BarChart3, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Report Issue', href: '/report', icon: FileText },
  { name: 'My Reports', href: '/reports', icon: AlertCircle },
  { name: 'Services', href: '/services', icon: Users },
  { name: 'Status', href: '/status', icon: BarChart3 },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('current_user')
      window.location.href = '/login'
    }
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            CityAssist
          </h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive
                            ? 'bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-white border-l-2 border-blue-500'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
                          'group flex gap-x-3 rounded-r-lg p-3 text-sm leading-6 font-medium transition-all'
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="group -mx-2 flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
              >
                <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
