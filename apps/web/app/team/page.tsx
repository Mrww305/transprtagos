import { User, Phone, Mail, Award } from 'lucide-react'

export default function TeamPage() {
  const teamMembers = [
    { id: 1, name: 'Muhammad Ali', role: 'Senior Driver', phone: '+92 300 1111111', email: 'ali@paktransit.pk', status: 'active', trips: 145 },
    { id: 2, name: 'Ahmed Khan', role: 'Driver', phone: '+92 321 2222222', email: 'ahmed@paktransit.pk', status: 'active', trips: 98 },
    { id: 3, name: 'Usman Malik', role: 'Fleet Manager', phone: '+92 333 3333333', email: 'usman@paktransit.pk', status: 'active', trips: 0 },
    { id: 4, name: 'Bilal Ahmed', role: 'Maintenance Chief', phone: '+92 345 4444444', email: 'bilal@paktransit.pk', status: 'on-leave', trips: 0 },
    { id: 5, name: 'Hassan Raza', role: 'Driver', phone: '+92 300 5555555', email: 'hassan@paktransit.pk', status: 'active', trips: 76 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="mt-2 text-gray-600">Driver and staff management</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3"><User className="h-6 w-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Team</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3"><Award className="h-6 w-6 text-green-600" /></div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Now</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.filter(m => m.status === 'active').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4"><h2 className="text-lg font-semibold text-gray-900">Team Members</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Trips</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{member.role}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {member.phone}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    {member.email}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{member.trips}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>{member.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
