import { Users, Phone, Mail, Building } from 'lucide-react'

export default function CRMPage() {
  const customers = [
    { id: 1, name: 'Al-Rehman Textiles', contact: 'Abdul Rehman', phone: '+92 300 1234567', email: 'rehman@textiles.pk', status: 'active' },
    { id: 2, name: 'Karachi Exports Ltd', contact: 'Sara Ahmed', phone: '+92 321 7654321', email: 'sara@exports.pk', status: 'active' },
    { id: 3, name: 'Lahore Industries', contact: 'Imran Khan', phone: '+92 333 9876543', email: 'imran@industries.pk', status: 'inactive' },
    { id: 4, name: 'Peshawar Trading', contact: 'Fatima Ali', phone: '+92 345 1122334', email: 'fatima@trading.pk', status: 'active' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
        <p className="mt-2 text-gray-600">Manage customer relationships and communications</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3"><Users className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3"><Building className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{customers.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4"><h2 className="text-lg font-semibold text-gray-900">Customer Directory</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{customer.contact}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {customer.phone}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    {customer.email}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>{customer.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
