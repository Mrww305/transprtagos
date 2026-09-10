import { Wrench, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'

export default function MaintenancePage() {
  const maintenanceTasks = [
    { id: 1, vehicle: 'Truck-001', type: 'Oil Change', status: 'scheduled', dueDate: '2024-01-15' },
    { id: 2, vehicle: 'Truck-004', type: 'Brake Inspection', status: 'in-progress', dueDate: '2024-01-10' },
    { id: 3, vehicle: 'Truck-002', type: 'Tire Rotation', status: 'completed', dueDate: '2024-01-08' },
    { id: 4, vehicle: 'Truck-006', type: 'Engine Check', status: 'overdue', dueDate: '2024-01-05' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Center</h1>
        <p className="mt-2 text-gray-600">Predictive vehicle maintenance scheduling</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3"><Wrench className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceTasks.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-yellow-100 p-3"><AlertTriangle className="h-6 w-6 text-yellow-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceTasks.filter(t => t.status === 'overdue').length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3"><CheckCircle className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceTasks.filter(t => t.status === 'completed').length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3"><Calendar className="h-6 w-6 text-purple-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{maintenanceTasks.filter(t => t.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4"><h2 className="text-lg font-semibold text-gray-900">Maintenance Schedule</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {maintenanceTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{task.vehicle}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{task.type}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{task.dueDate}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{task.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
