import { Package, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function OpsPage() {
  const shipments = [
    { id: 'SHP-001', origin: 'Lahore', destination: 'Karachi', status: 'in-transit', eta: '2 days' },
    { id: 'SHP-002', origin: 'Islamabad', destination: 'Multan', status: 'delivered', eta: 'Completed' },
    { id: 'SHP-003', origin: 'Faisalabad', destination: 'Peshawar', status: 'pending', eta: '1 day' },
    { id: 'SHP-004', origin: 'Quetta', destination: 'Hyderabad', status: 'in-transit', eta: '3 days' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Operations Center</h1>
        <p className="mt-2 text-gray-600">Monitor and manage all shipments</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3"><Package className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{shipments.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3"><TrendingUp className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'in-transit').length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-100 p-3"><Clock className="h-6 w-6 text-yellow-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3"><CheckCircle className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{shipments.filter(s => s.status === 'delivered').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4"><h2 className="text-lg font-semibold text-gray-900">Active Shipments</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{shipment.id}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{shipment.origin} → {shipment.destination}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{shipment.status}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{shipment.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
