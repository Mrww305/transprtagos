import { TrendingUp, Building, Phone, Mail } from 'lucide-react'

export default function PipelinePage() {
  const leads = [
    { id: 1, company: 'Faisalabad Fabrics', contact: 'Nasir Mahmood', phone: '+92 300 7777777', email: 'nasir@fabrics.pk', value: '₨ 500,000', stage: 'new' },
    { id: 2, company: 'Sialkot Sports', contact: 'Tariq Jameel', phone: '+92 321 8888888', email: 'tariq@sports.pk', value: '₨ 750,000', stage: 'contacted' },
    { id: 3, company: 'Multan Agro', contact: 'Shazia Bibi', phone: '+92 333 9999999', email: 'shazia@agro.pk', value: '₨ 1,200,000', stage: 'proposal' },
    { id: 4, company: 'Gwadar Logistics', contact: 'Aslam Khan', phone: '+92 345 0000000', email: 'aslam@logistics.pk', value: '₨ 2,000,000', stage: 'negotiation' },
    { id: 5, company: 'Rawalpindi Traders', contact: 'Farooq Ahmed', phone: '+92 300 1212121', email: 'farooq@traders.pk', value: '₨ 350,000', stage: 'closed' },
  ]

  const stages = ['new', 'contacted', 'proposal', 'negotiation', 'closed']
  const stageColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-purple-100 text-purple-800',
    proposal: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-orange-100 text-orange-800',
    closed: 'bg-green-100 text-green-800',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="mt-2 text-gray-600">GTM lead generation and tracking</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {stages.map((stage) => (
          <div key={stage} className="rounded-lg bg-white p-6 shadow-sm border">
            <p className="text-sm font-medium text-gray-600 capitalize">{stage}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{leads.filter(l => l.stage === stage).length}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white shadow-sm border">
        <div className="border-b px-6 py-4"><h2 className="text-lg font-semibold text-gray-900">All Leads</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <Building className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{lead.company}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-900">{lead.contact}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {lead.phone}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center text-gray-900">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    {lead.email}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{lead.value}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stageColors[lead.stage]}`}>
                    {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
