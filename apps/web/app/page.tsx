import Link from 'next/link'
import { Truck, Users, Wrench, Phone, PieChart, TrendingUp, User, ArrowRight } from 'lucide-react'

const features = [
  { name: 'Fleet Management', href: '/fleet', icon: Truck, description: 'Real-time vehicle tracking across 10 Pakistani cities' },
  { name: 'Operations', href: '/ops', icon: PieChart, description: 'Monitor shipments and route optimization' },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench, description: 'Predictive vehicle maintenance scheduling' },
  { name: 'CRM', href: '/crm', icon: Users, description: 'Customer relationship management' },
  { name: 'Team', href: '/team', icon: User, description: 'Driver and staff management' },
  { name: 'Pipeline', href: '/pipeline', icon: TrendingUp, description: 'GTM lead generation Kanban board' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Built for Pakistan&apos;s logistics industry{' '}
              <Link href="/fleet" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              PakTransit OS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Autonomous Transport Agent Operating System for Pakistan&apos;s logistics industry.
              Featuring 6 AI agents, real-time tracking, and Urdu voice support for drivers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/fleet"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get started
              </Link>
              <Link href="/driver" className="text-sm font-semibold leading-6 text-gray-900">
                Driver Mode <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Complete Fleet Management Platform
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Six autonomous AI agents working together to optimize your transport operations across Pakistan.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  <Link href={feature.href} className="hover:underline">
                    {feature.name}
                  </Link>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6" />
              <span className="text-sm">© 2024 PakTransit OS. Built for Pakistan 🇵🇰</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
