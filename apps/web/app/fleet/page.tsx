'use client'

import { Truck, MapPin, Clock, Activity } from 'lucide-react'

// Mock data - will be replaced with real API data
const vehicles = [
  { id: 1, name: 'Truck-001', driver: 'Muhammad Ali', location: 'Lahore', status: 'moving', fuel: 75, temp: 82 },
  { id: 2, name: 'Truck-002', driver: 'Ahmed Khan', location: 'Multan', status: 'stopped', fuel: 45, temp: 78 },
  { id: 3, name: 'Truck-003', driver: 'Usman Malik', location: 'Sukkur', status: 'moving', fuel: 90, temp: 85 },
  { id: 4, name: 'Truck-004', driver: 'Bilal Ahmed', location: 'Hyderabad', status: 'maintenance', fuel: 30, temp: 70 },
  { id: 5, name: 'Truck-005', driver: 'Hassan Raza', location: 'Karachi', status: 'moving', fuel: 60, temp: 88 },
  { id: 6, name: 'Truck-006', driver: 'Fahad Mustafa', location: 'Islamabad', status: 'idle', fuel: 85, temp: 75 },
]

const cities = [
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Lahore', lat: 31.5497, lng: 74.3436 },
  { name: 'Faisalabad', lat: 31.4241, lng: 73.0731 },
  { name: 'Multan', lat: 30.1575, lng: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
  { name: 'Sukkur', lat: 27.7058, lng: 68.8574 },
  { name: 'Hyderabad', lat: 25.3792, lng: 68.3683 },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Gwadar', lat: 25.1263, lng: 62.3222 },
]

export default function FleetPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
        <p className="mt-2 text-gray-600">Real-time tracking of all vehicles across Pakistan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'moving').length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <MapPin className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cities Covered</p>
              <p className="text-2xl font-bold text-gray-900">{cities.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Vehicle Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Engine Temp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <Truck className="mr-3 h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{vehicle.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">{vehicle.driver}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-gray-900">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      {vehicle.location}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      vehicle.status === 'moving' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'stopped' ? 'bg-yellow-100 text-yellow-800' :
                      vehicle.status === 'maintenance' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>{vehicle.fuel}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            vehicle.fuel > 50 ? 'bg-green-500' :
                            vehicle.fuel > 25 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${vehicle.fuel}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">{vehicle.temp}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm border">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Live Map View</h2>
        <div className="relative h-96 w-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="mx-auto h-12 w-12 mb-2" />
            <p>Interactive Pakistan Map</p>
            <p className="text-sm">Showing {vehicles.length} vehicles across {cities.length} cities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
