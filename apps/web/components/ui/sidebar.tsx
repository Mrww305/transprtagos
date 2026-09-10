'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Truck, Users, Wrench, Phone, PieChart, TrendingUp, User } from 'lucide-react'

const navigation = [
  { name: 'Fleet', href: '/fleet', icon: Truck },
  { name: 'Operations', href: '/ops', icon: PieChart },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Team', href: '/team', icon: User },
  { name: 'Pipeline', href: '/pipeline', icon: TrendingUp },
  { name: 'Driver', href: '/driver', icon: Phone },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center px-6">
        <Truck className="h-8 w-8" />
        <span className="ml-3 text-lg font-bold">PakTransit OS</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
