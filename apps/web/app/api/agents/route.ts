import { NextResponse } from 'next/server'

// Mock agent data - will be replaced with real agent state machine
const agents = [
  { id: 'dispatcher', name: 'Dispatcher Agent', status: 'active', tasks: 12, efficiency: 94 },
  { id: 'fleet', name: 'Fleet Agent', status: 'active', tasks: 8, efficiency: 97 },
  { id: 'maintenance', name: 'Maintenance Agent', status: 'active', tasks: 3, efficiency: 91 },
  { id: 'crm', name: 'CRM Agent', status: 'active', tasks: 15, efficiency: 89 },
  { id: 'finance', name: 'Finance Agent', status: 'active', tasks: 6, efficiency: 96 },
  { id: 'sales', name: 'Sales/GTM Agent', status: 'active', tasks: 10, efficiency: 92 },
]

export async function GET() {
  // In production: fetch agent states from database or Vercel KV
  return NextResponse.json({
    success: true,
    data: agents,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agentId, action, payload } = body

    // In production: validate with Zod and update agent state
    console.log(`Agent ${agentId} received action: ${action}`, payload)

    return NextResponse.json({
      success: true,
      message: `Agent ${agentId} processed action: ${action}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
